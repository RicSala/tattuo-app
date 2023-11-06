import { NextResponse } from 'next/server';
import queryString from 'query-string';
import prisma from '@/lib/prismadb';

export async function GET(request) {
  const parsedUrl = queryString.parseUrl(request.url);
  const { query } = parsedUrl;

  const { s = '' } = query;

  const cities = await prisma.style.findMany({
    where: {
      label: {
        startsWith: s,
        mode: 'insensitive',
      },
    },
    take: 10,
  });

  return NextResponse.json(cities, { status: 200 });
}
