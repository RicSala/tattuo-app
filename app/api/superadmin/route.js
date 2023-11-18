import { getData } from "@/app/scr/scraper";
import { NextResponse } from "next/server";

export async function GET(req) {
  const pages = await getData();

  return NextResponse.json({ message: "ok" }, { status: 201 });
}
