import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export function GET(request: NextApiRequest) {
  return new Response({ response: "Yo!" })
}
3
export async function POST(req: NextApiRequest) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' });
    }

    const mailChimpData = {
      members: [
        {
          email_address: email,
          status: 'subscribed',
        },
      ],
    };

    try {
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID as string;
      const URL = `https://us1.api.mailchimp.com/3.0/lists/${audienceId}`;
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Authorization: `auth ${process.env.MAILCHIMP_API_KEY as string}`,
        },
        body: JSON.stringify(mailChimpData),
      });

      const data = await response.json();

      if (data.errors[0]?.error) {
        return NextResponse.json({ error: data.errors[0].error });
      } else {
        return NextResponse.json({ success: true });
      }
    } catch (e) {
      return NextResponse.json({ error: 'Something went wrong, please try again later.' });
    }
  } else {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` });
  }
}
