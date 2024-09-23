import { kv } from "@vercel/kv";
import { hashSHA256 } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");
    const amount = data.get("amount");
    const providerReferenceId = data.get("providerReferenceId");

    const st =
      `/pg/v1/status/${merchantId}/${transactionId}` +
      process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = hashSHA256(st);
    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

    const options = {
      method: "GET",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactionId}`,
      // url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    const response = await axios.request(options);
    console.log("r===", response.data.code);

    if (response.data.code == "PAYMENT_SUCCESS") {
      //@ts-ignore
      const formDataString = await kv.get<string | null>(transactionId);
      if (!formDataString) {
        throw new Error("FormData not found");
      }

      let formData;
      try {
        formData = JSON.parse(formDataString);
       
      } catch (e) {
        formData = formDataString;
      }

      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, transactionId }),
        }
      );

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      const whatsappPayload = {
        phone_number: `91${formData.phone}`,
        template_message_id: "5947",
        template_params: [
          { name: "1", value: formData.name },
          {name:  "2", value: formData.tourPackage},
          { name: "3", value: formData.email },
          { name: "4", value: formData.phone },
          { name: "5", value: formData.tourDates },
          { name: "6", value: formData.noOfAdults.toString() },
          { name: "7", value:  formData.amountPaid },
          { name: "8", value: transactionId },
        ],
      };

      const whatsappResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sendTemplateMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_HAPILEE_API_KEY!,
          },
          body: JSON.stringify(whatsappPayload),
        }
      );

      if (!whatsappResponse.ok) {
        console.error("Failed to send WhatsApp message");
      }

      //@ts-ignore
      await kv.del(transactionId);

      return NextResponse.redirect(
        `https://offbeatsikkim.com/success?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`,
        // `http://localhost:3000/success?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`,
        { status: 301 }
      );
    } else {
      return NextResponse.redirect(
        `https://offbeatsikkim.com/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`,
        // `http://localhost:3000/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`,
        { status: 301 }
      );
    }
  } catch (error) {
    console.error("Error processing payment status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
