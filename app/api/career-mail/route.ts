import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
   
    const formData = await request.formData();

    const fields: Record<string, string> = {};
    let pdfFile: File | null = null;

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (key === "resume") {
          pdfFile = value;
        }
      } else {
        fields[key] = value.toString();
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

    const templateIds = process.env.SENDGRID_TEMPLATE_ID_CAREER_ADMIN;
    if (!templateIds) {
      return NextResponse.json(
        { error: "Invalid template ID" },
        { status: 400 }
      );
    }

    const msg = {
      to: "info@offbeatsikkim.com",
      from: "team@offbeatsikkim.com",
      templateId: templateIds,
      dynamicTemplateData: { ...fields },
      attachments: [
        {
          content: base64Content,
          filename: pdfFile.name,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);
    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("General Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}