import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const { transactionId, formData } = await req.json();

    console.log("Received data:", { transactionId, formData });
    if (!transactionId || !formData) {
      console.error("Missing transactionId or formData");
      return NextResponse.json(
        { error: "Missing transactionId or formData" },
        { status: 400 }
      );
    }

  
    await kv.set(transactionId, JSON.stringify(formData));

    console.log("Data stored successfully");
    return NextResponse.json(
      { message: "Form data stored successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error storing form data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}