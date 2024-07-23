import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    const body = await request.json();  
    console.log('Request body:', body);
    try {
      const response = await axios.post(
        'https://api.sembark.com/integrations/v1/trip-plan-requests',
        body,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.SEMBARK_BEARER_TOKEN}`, 
          },
        }
      );
      console.log('API response:', response.data);
      return NextResponse.json(response.data);
    } catch (error: any) {
        // console.error('API request failed:', error.response?.data || error.message);
        console.error('API request failed:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          stack: error.stack
      });
      return NextResponse.json(
        { message: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    }
}