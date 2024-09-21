import { NextResponse } from 'next/server';

interface TemplateParam {
  name: string;
  value: string;
}

interface RequestBody {
  phone_number: string;
  template_message_id: string;
  template_params: TemplateParam[];
  }

export async function POST(request: Request) {
  try {
    const { phone_number, template_message_id, template_params }: RequestBody = await request.json();

    
    console.log("Parsed Request Body:", { phone_number, template_message_id, template_params });


    if (!phone_number || !template_message_id || !template_params) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const body = {
      "candidate_details": {
        "phone_number": phone_number,
      },
      "template_message_id": template_message_id,
      "template_params": template_params,
    };

    console.log("Sending the following request body:", body);

    const response = await fetch('https://api.happilee.io/api/v1/sendTemplateMessage', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_HAPILEE_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('Content-Type') || '';
    let data;
    if (contentType.includes('application/json')) {
      // Parse JSON response if the content-type is application/json
      data = await response.json();
    } else {
      // Otherwise, get the raw text (likely an HTML error page)
      const rawText = await response.text();
      console.error('Raw Response:', rawText);
      return NextResponse.json({ error: 'Unexpected response format', rawText }, { status: 500 });
    }

    if (!response.ok || data.error) {
      console.error("API Error:", data.message || 'Failed to send template message');
      return NextResponse.json({ error: data.message || 'Failed to send template message' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully', data });
  } catch (error: any) {
    console.error("Error during fetch:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  //   const data = await response.json();
  //   if (!response.ok || data.error) {
  //     console.error("API Error:", data.message || 'Failed to send template message');
  //     return NextResponse.json({ error: data.message || 'Failed to send template message' }, { status: 500 });
  //   }

  //   return NextResponse.json({ message: 'Message sent successfully', data });
  // } catch (error: any) {
  //   console.error("Error during fetch:", error.message);
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
}
