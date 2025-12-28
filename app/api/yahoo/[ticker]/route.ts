import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

export async function GET(
    req: Request,
    context: { params: Promise<{ ticker: string }> }
) {
    const { ticker } = await context.params;

    try {
        console.log(`[Yahoo API] Fetching data for: ${ticker}`);
        const yahooFinance = new YahooFinance();

        // Fetch current fundamentals with specific modules
        const quote = await yahooFinance.quoteSummary(ticker, {
            modules: [
                'summaryDetail',
                'price',
                'financialData',
                'defaultKeyStatistics',
                'summaryProfile'
            ]
        });
        console.log(`[Yahoo API] Quote: ${JSON.stringify(quote)}`);


        // Fetch historical price data (25 years to cover 20y view + buffer)
        // Using '1mo' interval is efficient for long ranges
        const history = await yahooFinance.chart(ticker, {
            period1: new Date(new Date().setFullYear(new Date().getFullYear() - 25)).toISOString(),
            interval: '1mo'
        });

        console.log(`[Yahoo API] Price History Length: ${history.quotes.length}`);

        return NextResponse.json({
            quote,
            history: history.quotes
        });
    } catch (error) {
        console.error('Yahoo Finance API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Yahoo Finance data' },
            { status: 500 }
        );
    }
}
