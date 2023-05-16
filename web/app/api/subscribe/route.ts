import { NextResponse } from 'next/server';
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
      const listId = process.env.MAILCHIMP_LIST_ID as string;
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
      });
      console.log(response);

      if (response.status === 'subscribed') {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      
      return NextResponse.json({ error: response.status }, { status: 400 });
    } catch (e) {
      console.log(e)
      return NextResponse.json({ error: e.response?.res?.text?.detail || 'Something went wrong, try again later.' }, { status: 500 });
    }
}
