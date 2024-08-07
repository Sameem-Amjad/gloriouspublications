import connect from "@/lib/connectDB";
import Order from "@/lib/models/orderSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req,res) => {
  try {
    await connect();
    const {
      name,
      address,
      city,
      country,
      zipCode,
      email,
      quantity,
      paymentMethod,
      book,
      price,
    } = await req.json();
    const orders = new Order({
      name,
      address,
      city,
      country,
      zipCode,
      email,
      quantity,
      paymentMethod,
      book,
      price,
    });
    await orders.save();
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    return new NextResponse("Error in Submitting Books: " + err, { status: 500 });
  }
};
