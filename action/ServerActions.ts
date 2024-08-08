"use server";
import { v4 as uuidv4 } from "uuid";
import { hashSHA256 } from "@/lib/utils";
import axios from "axios";
export async function payment( mobileNumber:string,amount:number) {

    const transactionid = `${uuidv4().replace(/-/g, "").slice(0, 28)}`;
    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantTransactionId: transactionid,
      merchantUserId: `MUID-${uuidv4().replace(/-/g, "").slice(0, 28)}`,
      amount: amount,
      redirectUrl: `https://offbeatsikkim.com/api/paystatus`,
      redirectMode: "POST",
      callbackUrl: "https://offbeatsikkim.com/api/paystatus",
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");

    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = hashSHA256(fullURL);
    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    const UAT_PAY_API_URL =
      "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    const response = await axios.post(
      UAT_PAY_API_URL,
      {
        request: dataBase64,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
    return {url:redirectUrl ,transactionid:transactionid};
}