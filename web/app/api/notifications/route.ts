import { NextResponse } from 'next/server';
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

// data has to recieve
  // notification type
  // if new knife
    // title
    // imageUrl
    // description
    // slug
  // if new news item
    // title
    // content
    // slug

export async function POST(request: Request) {
  console.log("New thing added in Sanity!");

  return NextResponse.json({ success: true }, { status: 200 });

  // check if knife or news was created
  // trigger batch operation to send knife or news template and pass in the data

  // try {
  //   const listId = process.env.MAILCHIMP_LIST_ID as string;
  //   const response = await mailchimp.lists.addListMember(listId, {
  //     email_address: email,
  //     status: "subscribed",
  //   });
  //   console.log(response);

  //   if (response.status === 'subscribed') {
  //     return NextResponse.json({ success: true }, { status: 200 });
  //   } else {
  //     return NextResponse.json({ error: response.status }, { status: 400 });
  //   }
  // } catch (e) {
  //   console.log(e)
  //   return NextResponse.json({ error: e.response?.res?.text?.detail || 'Something went wrong, try again later.' }, { status: 500 });
  // }
}
