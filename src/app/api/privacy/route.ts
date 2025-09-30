import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://cashwyreservice.azurewebsites.net/api/v1.0/AppVersion/getVersion';

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Fetching privacy content from backend via POST...');
    
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(10000),
    });

    console.log('📡 Backend response status:', response.status);

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Backend data received - FULL RESPONSE:', JSON.stringify(data, null, 2));
    console.log('🔍 Available keys in response:', Object.keys(data));

    // Check for websitePrivacy in different possible locations
    const privacyContent = data.websitePrivacy || data.data?.websitePrivacy || data.result?.websitePrivacy;

    if (!privacyContent) {
      console.log('❌ websitePrivacy not found in any expected location');
      console.log('📋 Checking all nested properties...');
      
      // Recursive function to find any HTML content
      function findHtmlContent(obj: any, path: string = ''): string | null {
        for (const key in obj) {
          const value = obj[key];
          const currentPath = path ? `${path}.${key}` : key;
          
          if (typeof value === 'string' && value.includes('privacy-content-wrapper')) {
            console.log(`🎯 Found HTML content at: ${currentPath}`);
            return value;
          }
          
          if (typeof value === 'object' && value !== null) {
            const result = findHtmlContent(value, currentPath);
            if (result) return result;
          }
        }
        return null;
      }
      
      const foundContent = findHtmlContent(data);
      if (foundContent) {
        console.log('🎉 Found privacy content via search');
        return NextResponse.json({ 
          content: foundContent,
          success: true 
        });
      }
      
      throw new Error('Privacy content not found in backend response');
    }

    console.log('🎉 Returning privacy content successfully');
    return NextResponse.json({ 
      content: privacyContent,
      success: true 
    });

  } catch (error: any) {
    console.error('💥 API Route Error:', error);

    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return NextResponse.json(
        { 
          error: 'Request timeout - backend service took too long to respond',
          success: false 
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch privacy content from backend',
        success: false 
      },
      { status: 500 }
    );
  }
}