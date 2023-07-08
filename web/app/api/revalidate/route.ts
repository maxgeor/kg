import { headers } from 'next/headers'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const secret = process.env.SANITY_WEBHOOK_SECRET as string;
 
export async function POST(request: NextRequest) {
  console.log(request)
  try {
    const data = await request.json();

    const headersList = headers();
    const signature = headersList.get(SIGNATURE_HEADER_NAME) as string;
    console.log(headersList);
    if (!isValidSignature(JSON.stringify(data), signature, secret)) {
      console.log("BAD signature");
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 401 })
    }

    console.log("NICEEEEEE signature");
    // const tag = request.nextUrl.searchParams.get('tag') as string;
    // if (!tag) {
    //   return NextResponse.json({ success: false, message: 'No tag given' }, { status: 404 })
    // }
  
    // revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}