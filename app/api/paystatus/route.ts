import { client } from "@/lib/sanity";
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
      const query = `*[_type == "formData" && transactionId == $transactionId][0]`;
      const params = { transactionId };
      const formData = await client.fetch(query, params);
      
      if (!formData) {
        throw new Error("FormData not found");
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      const emailResponse = await fetch(`${baseUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await client.delete(formData._id);
      // //@ts-ignore
      // const formDataJson = await kv.get(transactionId);
      //  //@ts-ignore
      // const formData = JSON.parse(formDataJson);

      // if (!formData) {
      //   throw new Error("FormData not found");
      // }

      // console.log("Retrieved formData: ", formData);
      // formData.transactionId = transactionId;

      // const emailResponse = await fetch(`${baseUrl}/api/send-email`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const emailResult = await emailResponse.json();
      // console.log("Send email response:", emailResult);

      return NextResponse.redirect(
        `https://offbeatsikkim.com/success?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`,
        { status: 301 }
      );
    } else {
      return NextResponse.redirect(
        `https://offbeatsikkim.com/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`,
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
