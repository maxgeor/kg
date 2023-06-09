"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";

export async function subscribe(email: string) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });

  if (!email) {
    return { error: 'Email is required' }
  }

  try {
    const listId = process.env.MAILCHIMP_LIST_ID as string;
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
    });

    return response.status === "subscribed"
      ? { success: true }
      : { error: response.status };
  } catch (e) {
    console.log(e);
    return {
      error:
        e.response?.res?.text?.detail ||
        "Something went wrong, try again later.",
    };
  }
}