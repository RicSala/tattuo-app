import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  console.log("received");
  console.log(body);

  return NextResponse.json({ message: "Opinión recibida" }, { status: 201 });
}
