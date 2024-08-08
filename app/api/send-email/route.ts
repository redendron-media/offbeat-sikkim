import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const templateMapping = {
  curated: {
    admin: process.env.SENDGRID_TEMPLATE_ID_CURATED_ADMIN,
    user: process.env.SENDGRID_TEMPLATE_ID_CURATED_USER,
  },
  trek: {
    admin: process.env.SENDGRID_TEMPLATE_ID_TREK_ADMIN,
    user: process.env.SENDGRID_TEMPLATE_ID_TREK_USER,
  },
  upcoming: {
    admin: process.env.SENDGRID_TEMPLATE_ID_UPCOMING_ADMIN,
    user: process.env.SENDGRID_TEMPLATE_ID_UPCOMING_USER,
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

    const adminMsg = {
      to: "enquiry@offbeatsikkim.com",
      from: "team@offbeatsikkim.com",
      name: "Offbeat Sikkim",
      templateId: templateIds.admin,
       dynamicTemplateData: { ...transformedFormData },
    };

    const userMsg =
      formData.email && templateIds.user
        ? {
            to: formData.email,
            from: "team@offbeatsikkim.com",
            name: "Offbeat Sikkim",
            templateId: templateIds.user,
            dynamicTemplateData: { ...transformedFormData },
          }
        : null;

    try {
      await sgMail.send(adminMsg);
      if (userMsg) {
        await sgMail.send(userMsg);
      } else {
        console.warn("User email not sent: no user email or template ID");
      }

      return NextResponse.json({ message: "Emails sent successfully" });
    } catch (emailError) {
      const error = emailError as { response: { body: { errors: any[] } } };
      console.error("SendGrid Email Error:", error.response.body.errors);
      return NextResponse.json(
        { error: "Failed to send emails" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("General Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
