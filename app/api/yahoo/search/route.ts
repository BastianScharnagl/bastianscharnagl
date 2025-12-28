import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    try {
        const yahooFinance = new YahooFinance();
        const results = await yahooFinance.search(query, { region: 'US' });
        return NextResponse.json({ results: results.quotes });
    } catch (error) {
        console.error('Yahoo Search Error:', error);
        return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
    }
}