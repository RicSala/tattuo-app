import { sendEmail } from "@/lib/mailgun";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  await sendEmail(
    "ricardo@grouz.io",
    "Nuevo Feedback Recibido",
    `Rating: ${body.value}<br>Message: ${body.message}<br>`,
    `<strong>Rating</strong>: ${body.value}<br><strong>Message</strong>: ${body.message}<br>`,
    "ricardo@ricardo.com",
  );

  console.log("received");
  console.log(body);

  return NextResponse.json({ message: "Opinión recibida" }, { status: 201 });
}
