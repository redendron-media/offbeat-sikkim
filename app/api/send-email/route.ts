import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const templateMapping = {
  curated: {
    admin: 4,
    user: 3,
  },
  trek: {
    admin: 5,
    user: 6,
  },
  upcoming: {
    admin: 2,
    user: 1,
  },
};

const getTemplateIds = (source: string) => {
  if (source.includes("curated") || source.includes("default")) return templateMapping.curated;
  if (source.includes("trek")) {
    return templateMapping.trek;
  }
  if (source.includes("upcoming")) return templateMapping.upcoming;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const templateIds = getTemplateIds(formData.source);
    if (!templateIds) {
      return NextResponse.json(
        { error: "Invalid source type" },
        { status: 400 }
      );
    }

    if (!templateIds.admin) {
      console.error("Missing admin template ID");
      return NextResponse.json(
        { error: "Missing admin template ID" },
        { status: 400 }
      );
    }

    const transformedFormData = {
      ...formData,
      ...(formData.source.includes("upcoming") ? {} : { age: formData.age && Array.isArray(formData.age) ? formData.age.join(", ") : formData.age || '' }),
    };

    const brevoPayload = (templateId: number, toEmail: string) => ({
      templateId: Number(templateId),
      to: [{ email: toEmail }],
      params: transformedFormData,
    });

     const headers = {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    };

    const adminEmail = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      brevoPayload(templateIds.admin, "enquiry@offbeatsikkim.com"),
      { headers }
    );

    if (formData.email && templateIds.user) {
      const userEmail = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        brevoPayload(templateIds.user, formData.email),
        { headers }
      );

      const [firstname, lastname = " "] =formData.name?.split(" ") ?? ["", ""];
      let sourceLabel = "";
      if (templateIds.user === 1) sourceLabel = "upcoming";
      else if (templateIds.user === 3) sourceLabel = "curated";
      else if (templateIds.user === 6) sourceLabel = "trek";

      await axios.post(
        "https://api.brevo.com/v3/contacts",
        {
          email: formData.email,
          attributes: {
            FIRSTNAME: firstname,
            LASTNAME: lastname,
            FULLNAME: formData.name || "",
            SMS: formData.phone ? `+91${formData.phone}` : "",
            SOURCE: sourceLabel,
          },
          listIds: [4], 
          updateEnabled: true,
        },
        { headers }
      );
    }

    return NextResponse.json({ message: "Emails sent successfully via Brevo" });
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Brevo Error:", error.response.data);
      return NextResponse.json({ error: "Brevo email failed", details: error.response.data }, { status: 500 });
    }
    console.error("Unhandled Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}