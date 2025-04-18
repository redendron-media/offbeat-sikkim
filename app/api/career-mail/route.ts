import { NextRequest, NextResponse } from "next/server";
import axios from "axios";



export const config = {
  api: {
    bodyParser: false,
  },
};

const templateIds = 8;
export async function POST(request: NextRequest) {
  try {
   
    const formData = await request.formData();

    const fields: Record<string, string> = {};
    let pdfFile: File | null = null;

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && key === "resume") {
        pdfFile = value;
      } else if (typeof value === "string") {
        fields[key] = value;
      }
    }


    if (!pdfFile) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    if (pdfFile.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const fileBytes = await pdfFile.arrayBuffer();
    const base64Content = Buffer.from(fileBytes).toString("base64");


    if (!templateIds) {
      return NextResponse.json(
        { error: "Invalid template ID" },
        { status: 400 }
      );
    }

    const brevoPayload = {
      templateId: templateIds,
      to: [{ email: "enquiry@offbeatsikkim.com" }],
      params: fields,
      attachment: [
        {
          content: base64Content,
          name: pdfFile.name,
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    };

    await axios.post("https://api.brevo.com/v3/smtp/email", brevoPayload, {
      headers,
    });

    return NextResponse.json({ message: "Email sent successfully via Brevo" });
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Brevo API Error:", error.response.data);
      return NextResponse.json(
        { error: "Failed to send email", details: error.response.data },
        { status: 500 }
      );
    }

    console.error("General Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}