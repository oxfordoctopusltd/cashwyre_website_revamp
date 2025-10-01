import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fiatAmount, fiatCurrency, cryptoAsset } = body;

    // This would call the actual backend service to calculate the crypto amount
    // For now, we'll create a proxy to the actual service when available
    const response = await fetch('https://cashwyreservice.azurewebsites.net/api/v1.0/Crypto4Cash/calculateCryptoAmount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AppId: "67dc443a-d148-800a-ba3c-077f41b637a0",
        RequestId: "001web001web9",
        fiatAmount,
        fiatCurrency,
        cryptoAsset
      }),
    });

    if (!response.ok) {
      // If the endpoint doesn't exist yet, return a placeholder response
      // In production, this would be the actual calculation from the backend
      return NextResponse.json({
        success: true,
        data: {
          cryptoAmount: "0.00000606", // This would come from actual calculation
          exchangeRate: "64944465.37" // This would come from actual rates
        }
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calculating crypto amount:', error);
    // Return placeholder data if the service is not available
    return NextResponse.json({
      success: true,
      data: {
        cryptoAmount: "0.00000606",
        exchangeRate: "64944465.37"
      }
    });
  }
}