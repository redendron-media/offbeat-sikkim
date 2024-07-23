import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
    try {
      const formData = await request.json();
      const templateIds = process.env.SENDGRID_TEMPLATE_ID_CONTACT_ADMIN;
  
      if (!templateIds) {
        return NextResponse.json(
          { error: "Invalid source type" },
          { status: 400 }
        );
      }
      const msg = {
        to: "team@offbeatsikkim.com",
        from: "team@offbeatsikkim.com",
        templateId: templateIds,
        dynamicTemplateData: { ...formData },
      };
      try {
        await sgMail.send(msg);
        console.log("Admin email sent successfully");
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
  