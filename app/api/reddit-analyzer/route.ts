import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://localhost:8001/analyze?limit=100&top_n=50');
        
        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Reddit Analyzer API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Reddit analysis' },
            { status: 500 }
        );
    }
}
