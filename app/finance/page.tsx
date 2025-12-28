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
                        Financial <span className="text-gradient">Intelligence</span>
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
                                setQuery(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Search by company or ticker (e.g. AAPL, NVIDIA)..."
                            className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-[2rem] px-8 py-5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </div>
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

                {/* Features Grid */}
                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Company Insights',
                            desc: 'Deep dive into SEC filings, income statements, balance sheets, and cash flows.',
                            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        },
                        {
                            title: 'Historical Trends',
                            desc: 'Analyze 20-year performance trends and key financial metrics over time.',
                            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                        },
                        {
                            title: 'Market Data',
                            desc: 'Live quotes, technical indicators, and comprehensive market analysis tools.',
                            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        }
                    ].map((feature, i) => (
                        <div key={i} className="glass p-8 rounded-[2.5rem] hover:translate-y-[-4px] transition-all">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 font-bold">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FinancePage;
