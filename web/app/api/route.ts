import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // return new Response.json({ response: 'Working!' });
  return new Response('Working!');
}