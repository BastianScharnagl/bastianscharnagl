'use client';

import React from 'react';
import { useEffect, useState } from 'react';

interface TickerCount {
    name: string;
    count: number;
}

interface AnalysisData {
    subreddit: string;
    posts_analyzed: number;
    tickers: TickerCount[];
}

export default function WallStreetBetsAnalyzer() {
    const [data, setData] = useState<AnalysisData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/reddit-analyzer?limit=100');
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(
                    {
                        subreddit: "wallstreetbets",
                        posts_analyzed: 100,
                        tickers: result,
                    }
                );
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!data || data.tickers.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">No data available</div>
            </div>
        );
    }

    const maxCount = Math.max(...data.tickers.map(t => t.count));

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-2">r/wallstreetbets</h1>
            <p className="text-gray-600 mb-8">
                Analyzed {data.posts_analyzed} posts for stock ticker mentions. Top mentioned keywords matching tickers are displayed below.
            </p>

            <div className="space-y-3">
                {data.tickers.slice(0, 30).map((item, index) => (
                    <div key={item.name} className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 w-6">
                            #{index + 1}
                        </span>
                        <span className="font-mono w-16 font-bold text-green-600">
                            ${item.name}
                        </span>
                        <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded transition-all duration-500"
                                style={{
                                    width: `${(item.count / maxCount) * 100}%`,
                                    minWidth: item.count > 0 ? '2px' : '0'
                                }}
                            />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                            {item.count}
                        </span>
                    </div>
                ))}
            </div>

            {data.tickers.length > 30 && (
                <div className="mt-8 text-gray-500 text-sm">
                    + {data.tickers.length - 30} more tickers
                </div>
            )}
        </div>
    );
}