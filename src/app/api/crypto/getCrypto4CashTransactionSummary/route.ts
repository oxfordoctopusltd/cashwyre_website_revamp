import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch('https://cashwyreservice.azurewebsites.net/api/v1.0/Crypto4Cash/getCrypto4CashTransactionSummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching crypto4cash transaction summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto4cash transaction summary' },
      { status: 500 }
    );
  }
}