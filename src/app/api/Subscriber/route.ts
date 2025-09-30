import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Map frontend fields to the required API payload
    const payload = {
      Name: body.fullName || body.name || '',
      Email: body.email,
      PhoneNumber: '',
      Comment: body.message,
      BecomeAPartner: false,
      Country: 'NG',
      ReferalName: '',
      ReferalPhoneNumber: '',
      AppId: '67dc443a-d148-800a-ba3c-077f41b637a0',
      RequestId: Math.random().toString(36).substring(2, 12)
    };
    const response = await fetch('https://cashwyreservice.azurewebsites.net/api/v1.0/Subscriber', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ error: errorData.message || 'Failed to submit' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}