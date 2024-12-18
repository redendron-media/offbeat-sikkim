import { NextRequest,NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req:NextRequest) {
    try{

        const body = await req.json();
        const { gatewayCost } = body;
    
        if (!gatewayCost || typeof gatewayCost !== "number") {
          return NextResponse.json(
            { error: "Invalid or missing gatewayCost" },
            { status: 400 }
          );
        }
        const order = await razorpay.orders.create({
            amount: gatewayCost,
            currency: "INR",
            receipt: "receipt_"+Math.random().toString(36).substring(7),
        });

        return NextResponse.json({orderId:order.id},{status:200})
    }catch (error){
     console.error("Error",error)
     return NextResponse.json(
        {error :"Error creating order"},
        {status: 500}
     )
    }
} 