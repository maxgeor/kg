var fs = require('fs');
import { toHTML } from '@portabletext/to-html'
import { urlFor } from '../../lib/sanity/images';
import { NextResponse } from 'next/server';
import { load } from 'cheerio';
import mailchimp from "@mailchimp/mailchimp_marketing";

interface SanityContent {
  _type: 'knife' | 'news',
  slug: {
    _type: string, 
    current: string
  },
  name?: string,
  title?: string,
  coverImage?: any,
  description?: string
  content: {
    style: string,
    _key: string,
    _type: string,
    children: [][],
    markDefs: [][]
  }[],
}

interface EmailTemplateDetails {
  ctaUrl: string,
}

interface KnifeEmailTemplateDetails extends EmailTemplateDetails {
  name: string,
  imageUrl: string,
  description: string,
}

interface NewsEmailTemplateDetails extends EmailTemplateDetails  {
  title: string,
  content: {
    style: string,
    _key: string,
    _type: string,
    children: [][],
    markDefs: [][]
  }[],
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});


export async function POST(request: Request) {
  const newSanityContent: SanityContent = await request.json();

  const { _type: type, title, content, name, coverImage, description, slug } = newSanityContent;
  
  if (type === 'knife') {
    const subject = `New Knife: ${name}` || 'New Knife'
    const imageUrl = urlFor(coverImage).width(1000).height(1000).url();
    const details = {
      name: name,
      imageUrl: imageUrl,
      description: description,
      ctaUrl: `https://www.kghandcrafted.com/knives/${slug?.current}`,
    } as KnifeEmailTemplateDetails;
    
    const html = htmlFor('knife', details);

    return sendEmail(subject, html)
  }

  if (type === 'news') {
    const subject = title || 'Update';
    const details = {
      title: title,
      content: content,
      ctaUrl: `https://www.kghandcrafted.com/news/${slug?.current}`,
    } as NewsEmailTemplateDetails;
    
    const html = htmlFor('news', details);

    return sendEmail(subject, html)
  }

  return NextResponse.json({ error: "Didn't recieve a knife or news from Sanity" }, { status: 400 });
}


function htmlFor(
  template: 'knife' | 'news', 
  details: KnifeEmailTemplateDetails | NewsEmailTemplateDetails
) {
  try {
    return fs.readFile(`../../emails/${template}.html`, 'utf8', (error, file) => {
      if (error) {
        return NextResponse.json(
          { error: `Template for "${template}" doesn't exist` }, 
          { status: 500 }
        );
      }

      const $ = load(file);

      if (template === 'knife') {
        const { name, imageUrl, description, ctaUrl } = details;
        $('#name').text = name;
        $('#image').attr("src", imageUrl);
        $('#description').text = description;
        $('#cta').attr("href", ctaUrl);
        
        console.log($.html());

        return $.html();
      }
    
      if (template === 'news') {
        const { title, content, ctaUrl } = details;
        $('#title').text = title;
        $('#content').text = toHTML(content).toString();
        $('#cta').attr("href", ctaUrl);
        return $.html();
      }
    });
  } catch(error) {
    console.log(error);
    return '';
  }
}

async function sendEmail(subject: string, html: string) {
  const listId = process.env.MAILCHIMP_LIST_ID as string;

  try {
    const response = await mailchimp.campaigns.create({ 
      type: "regular",
      recipients: {
        list_id: listId,
      },
      settings: {
        subject_line: subject,
        from_name: 'KG Handcrafted',
        reply_to: 'kevin_g8405@hotmail.com',
      },
    });

    const campaignId = response.id;

    await mailchimp.campaigns.setContent(campaignId, { html });

    const campaign = await mailchimp.campaigns.get(campaignId);
    console.log(campaign)

    await mailchimp.campaigns.send(campaignId);

    console.log("email sent!")
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Something went wrong, try again later.' }, { status: 400 });
  }
}