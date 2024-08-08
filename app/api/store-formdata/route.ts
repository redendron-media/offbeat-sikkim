import {client} from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const body = await req.json();
    const { transactionId, formData } = body;

    await client.create({
      _type: "formData",
      transactionId,
      ...formData,
    });

    return NextResponse.json({ message: "Form data stored successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error storing form data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}