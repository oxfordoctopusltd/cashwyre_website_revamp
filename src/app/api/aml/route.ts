import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://cashwyreservice.azurewebsites.net/api/v1.0/AppVersion/getVersion';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Check for websiteAMLPolicy in different possible locations
    const amlContent = data.websiteAMLPolicy || data.data?.websiteAMLPolicy || data.result?.websiteAMLPolicy;

    if (!amlContent) {
      // Recursive function to find any HTML content for AML policy
      function findHtmlContent(obj: any, path: string = ''): string | null {
        for (const key in obj) {
          const value = obj[key];
          if (typeof value === 'string' && value.includes('aml-policy-content-wrapper')) {
            return value;
          }
          if (typeof value === 'object' && value !== null) {
            const result = findHtmlContent(value);
            if (result) return result;
          }
        }
        return null;
      }
      const foundContent = findHtmlContent(data);
      if (foundContent) {
        return NextResponse.json({ content: foundContent, success: true });
      }
      throw new Error('AML policy not found in backend response');
    }

    return NextResponse.json({ content: amlContent, success: true });

  } catch (error: any) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - backend service took too long to respond', success: false },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Failed to fetch AML policy from backend', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Allow POST for dev/test compatibility
  return GET(request);
}
