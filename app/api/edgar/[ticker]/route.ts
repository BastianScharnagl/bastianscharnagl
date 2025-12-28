import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    context: { params: Promise<{ ticker: string }> }
) {
    const { ticker } = await context.params;

    try {
        // We attempt to call the Python API if it's running
        // This is a proxy to the edgar_api.py (FastAPI)
        const response = await fetch(`http://localhost:8000/financial/${ticker}/comprehensive`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'EDGAR API not available' }, { status: 503 });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Edgar Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to connect to EDGAR service' }, { status: 500 });
    }
}
