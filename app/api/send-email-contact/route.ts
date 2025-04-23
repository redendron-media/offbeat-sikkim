import { NextRequest, NextResponse } from "next/server";
import axios from "axios";



export async function POST(request: NextRequest) {
    try {
      const formData = await request.json();
      const templateIds = 7;
      const listId = 4;
  
      if (!templateIds) {
        return NextResponse.json(
          { error: "Invalid source type" },
          { status: 400 }
        );
      }
      const brevoPayload = {
        templateId: templateIds,
        to: [{ email: "enquiry@offbeatsikkim.com" }],
        params: formData,

      };
  
      const headers = {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      };
  
      await axios.post("https://api.brevo.com/v3/smtp/email", brevoPayload, {
        headers,
      });
  
      console.log("Admin email sent successfully via Brevo");

      if (formData.email) {
        const [firstname, lastname = ""] = formData.name?.split(" ") ?? ["", ""];
  
        await axios.post(
          "https://api.brevo.com/v3/contacts",
          {
            email: formData.email,
            attributes: {
              FIRSTNAME: firstname,
              LASTNAME: lastname,
              FULLNAME: formData.name || "",
              SMS: formData.phone ? `+91${formData.phone}` : "",
              SOURCE: "Contact Form", // Add this only if you created a custom 'SOURCE' attribute in Brevo
            },
            listIds: [listId],
            updateEnabled: true,
          },
          { headers }
        );
  
        console.log("Contact saved to Brevo");
      }

      return NextResponse.json({ message: "Email sent successfully" });
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Brevo API Error:", error.response.data);
        return NextResponse.json(
          { error: "Failed to send email", details: error.response.data },
          { status: 500 }
        );
      }
  
      console.error("General Error:", error);
      return NextResponse.json(
        { error: "Failed to process request" },
        { status: 500 }
      );
    }
  }