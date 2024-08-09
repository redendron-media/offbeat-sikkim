import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const { transactionId, formData } = await req.json();
    await kv.set(transactionId, JSON.stringify(formData));

    return NextResponse.json({ message: "Form data stored successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error storing form data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}