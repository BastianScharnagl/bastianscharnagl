'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
    symbol: string;
    shortname?: string;
    longname?: string;
    exchange?: string;
    quoteType?: string;
}

const FinancePage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /*
    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`/api/yahoo/search?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                if (data.results) {
                    setResults(data.results.filter((r: SearchResult) => r.quoteType === 'EQUITY'));
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [query]);
    */
    const handleSelect = (symbol: string) => {
        router.push(`/finance/${symbol}`);
        setShowDropdown(false);
        setQuery('');
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/5 to-transparent -z-10" />

            <main className="max-w-4xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Financial Intelligence
                    </h1>
                    <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto">
                        Analyze global markets, company fundamentals, and historical performance using live SEC and Yahoo Finance data.
                    </p>
                </div>

                <div className="relative max-w-2xl mx-auto" ref={dropdownRef}>
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value.toUpperCase());
                                setShowDropdown(true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && query) {
                                    handleSelect(query);
                                }
                            }}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Enter ticker symbol (e.g. AAPL, NVIDIA)..."
                            className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-[2rem] px-8 py-5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg font-bold tracking-wider"
                        />
                        <button
                            onClick={() => query && handleSelect(query)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-2.5 rounded-[1.5rem] font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                        >
                            Analyze
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    {showDropdown && results.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden z-50 glass">
                            <div className="max-h-[400px] overflow-y-auto">
                                {results.map((result) => (
                                    <button
                                        key={result.symbol}
                                        onClick={() => handleSelect(result.symbol)}
                                        className="w-full text-left px-8 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border-b last:border-b-0 border-zinc-100 dark:border-zinc-800 flex items-center justify-between"
                                    >
                                        <div className="flex-1 min-w-0 mr-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-lg text-blue-500">{result.symbol}</span>
                                                <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded uppercase">{result.exchange}</span>
                                            </div>
                                            <p className="text-zinc-500 text-sm truncate">{result.longname || result.shortname}</p>
                                        </div>
                                        <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Market Quick Links / Popular Tags */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL', 'AMZN'].map((ticker) => (
                        <button
                            key={ticker}
                            onClick={() => handleSelect(ticker)}
                            className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:text-blue-500 transition-all text-sm font-medium text-zinc-500"
                        >
                            {ticker}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FinancePage;
