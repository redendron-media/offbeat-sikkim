import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { kv } from "@vercel/kv";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract Razorpay parameters
    const { razorpay_payment_id, formData } = body;

    if (!razorpay_payment_id || !formData) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    console.log("Post-payment actions triggered for:", razorpay_payment_id);

    // Fetch the corresponding form data
    const savedFormDataString = await kv.get<string | null>(razorpay_payment_id);
    const savedFormData = savedFormDataString ? JSON.parse(savedFormDataString) : null;

    const finalFormData = formData || savedFormData;

      if (!finalFormData) {
      throw new Error("Form data not found");
    }

  

    // Prepare email payload
    const emailPayload = {
      ...finalFormData,
      transactionId: razorpay_payment_id,
    };

    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send email");
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Prepare WhatsApp payload
    // const whatsappPayload = {
    //   phone_number: `91${formData.phone}`,
    //   template_message_id: "5947",
    //   template_params: [
    //     { name: "1", value: formData.name },
    //     { name: "2", value: formData.tourPackage },
    //     { name: "3", value: formData.email },
    //     { name: "4", value: formData.phone },
    //     { name: "5", value: formData.tourDates },
    //     { name: "6", value: formData.noOfAdults.toString() },
    //     { name: "7", value: formData.amountPaid },
    //     { name: "8", value: razorpay_payment_id },
    //   ],
    // };

    // const whatsappResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendTemplateMessage`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-api-key": process.env.NEXT_PUBLIC_HAPILEE_API_KEY!,
    //   },
    //   body: JSON.stringify(whatsappPayload),
    // });

    // if (!whatsappResponse.ok) {
    //   console.error("Failed to send WhatsApp message");
    // }

    // Clean up KV store
    await kv.del(razorpay_payment_id);

    return NextResponse.json({ message: "Post-payment actions completed" });
  } catch (error) {
    console.error("Error in post-payment actions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
