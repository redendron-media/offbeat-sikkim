import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
interface FormDataStore {
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  try {
    const { transactionId, formData } = await req.json();

    // Store formData in Vercel's KV store
    await kv.set(transactionId, JSON.stringify(formData));

    return NextResponse.json({ message: "Form data stored successfully" });
  } catch (error) {
    console.error("Error storing form data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}