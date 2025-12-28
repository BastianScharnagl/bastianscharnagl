'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface YahooData {
    quote: {
        summaryDetail: any;
        price: any;
        defaultKeyStatistics: any;
        financialData: any;
        summaryProfile: any;
    };
    history: any[];
}

interface EdgarData {
    company_info: {
        name: string;
        ticker: string;
        shares_outstanding: number;
        public_float: number;
    };
    periods: string[];
    income_statement: any;
    balance_sheet: any;
    cash_flow: any;
    metadata: any;
}

const CompanyDetailPage = () => {
    const { symbol } = useParams();
    const router = useRouter();
    const [yahooData, setYahooData] = useState<YahooData | null>(null);
    const [edgarData, setEdgarData] = useState<EdgarData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'income' | 'balance' | 'cashflow'>('overview');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Yahoo Data
                const yResponse = await fetch(`/api/yahoo/${symbol}`);
                const yJson = await yResponse.json();

                // Fetch Edgar Data
                const eResponse = await fetch(`/api/edgar/${symbol}`);
                const eJson = await eResponse.json();

                console.log(eJson);

                if (yJson.error) throw new Error(yJson.error);

                setYahooData(yJson);
                if (!eJson.error) setEdgarData(eJson);

            } catch (err: any) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to fetch company data');
            } finally {
                setLoading(false);
            }
        };

        if (symbol) fetchData();
    }, [symbol]);

    const formatValue = (val: number) => {
        if (Math.abs(val) >= 1e12) return (val / 1e12).toFixed(2) + 'T';
        if (Math.abs(val) >= 1e9) return (val / 1e9).toFixed(2) + 'B';
        if (Math.abs(val) >= 1e6) return (val / 1e6).toFixed(2) + 'M';
        return val.toLocaleString();
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-zinc-500 animate-pulse font-medium">Analyzing {symbol}...</p>
            </div>
        </div>
    );

    if (error || !yahooData) return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass p-12 rounded-[3rem] text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Analysis Failed</h2>
                <p className="text-zinc-500 mb-8">{error || 'Could not find data for this symbol.'}</p>
                <Link href="/finance" className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold hover:scale-105 transition-all inline-block">
                    Back to Search
                </Link>
            </div>
        </div>
    );

    const quote = yahooData.quote;
    const price = quote.price || {};
    const summary = quote.summaryDetail || {};
    const summaryProfile = quote.summaryProfile || {};

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-4 relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent -z-10" />

            <main className="max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full uppercase tracking-wider">
                                {price.exchangeName || 'Market'}
                            </span>
                            <span className="text-zinc-500 font-medium text-sm">{symbol}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2">{price.longName || symbol}</h1>
                        <p className="text-zinc-500 text-lg">{summaryProfile.industry} • {summaryProfile.sector}</p>
                    </div>

                    <div className="text-right">
                        <div className="text-4xl font-black mb-1">
                            {price.regularMarketPrice?.fmt || price.regularMarketPrice || 'N/A'}
                            <span className="text-xl text-zinc-400 ml-2 font-medium">{price.currency}</span>
                        </div>
                        <div className={`text-lg font-bold ${(price.regularMarketChange || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {(price.regularMarketChange || 0) >= 0 ? '+' : ''}
                            {price.regularMarketChange?.fmt || '0.00'} ({price.regularMarketChangePercent?.fmt || '0.00%'})
                        </div>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                    {[
                        { label: 'Market Cap', value: summary.marketCap?.fmt || formatValue(summary.marketCap) },
                        { label: 'P/E (TTM)', value: summary.trailingPE?.fmt || summary.trailingPE || 'N/A' },
                        { label: 'Div Yield', value: summary.dividendYield?.fmt || (summary.dividendYield ? (summary.dividendYield * 100).toFixed(2) + '%' : 'N/A') },
                        { label: 'Revenue', value: quote.financialData?.totalRevenue?.fmt || formatValue(quote.financialData?.totalRevenue) },
                        { label: 'Profit Margin', value: quote.financialData?.profitMargins?.fmt || (quote.financialData?.profitMargins * 100).toFixed(2) + '%' },
                        { label: 'Beta', value: summary.beta?.fmt || summary.beta || 'N/A' },
                    ].map((metric, i) => (
                        <div key={i} className="glass p-6 rounded-3xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">{metric.label}</span>
                            <span className="text-xl font-bold">{metric.value}</span>
                        </div>
                    ))}
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl w-fit mb-8">
                    {['overview', 'income', 'balance', 'cashflow'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                                ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-500'
                                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                    {activeTab === 'overview' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="glass p-10 rounded-[2.5rem]">
                                    <h3 className="text-2xl font-bold mb-6">Business Summary</h3>
                                    <p className="text-zinc-500 leading-relaxed text-lg">
                                        {quote.summaryProfile?.longBusinessSummary || 'No summary available.'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="glass p-8 rounded-[2rem]">
                                    <h3 className="text-xl font-bold mb-6">Details</h3>
                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <span className="text-zinc-400 block mb-1">Headquarters</span>
                                            <p className="font-bold">
                                                {quote.summaryProfile?.city}, {quote.summaryProfile?.state}, {quote.summaryProfile?.country}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-zinc-400 block mb-1">Employees</span>
                                            <p className="font-bold">{quote.summaryProfile?.fullTimeEmployees?.toLocaleString() || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-zinc-400 block mb-1">Website</span>
                                            <a href={quote.summaryProfile?.website} target="_blank" className="text-blue-500 hover:underline">
                                                {quote.summaryProfile?.website}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeTab === 'income' || activeTab === 'balance' || activeTab === 'cashflow') && (
                        <div className="glass p-8 md:p-12 rounded-[3rem] overflow-x-auto">
                            {!edgarData ? (
                                <div className="py-20 text-center">
                                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h4 className="font-bold text-xl mb-2">EDGAR Data Unavailable</h4>
                                    <p className="text-zinc-500">Make sure the financial data service is running locally.</p>
                                </div>
                            ) : (
                                <table className="w-full text-left min-w-[800px]">
                                    <thead>
                                        <tr>
                                            <th className="pb-6 text-sm font-black uppercase tracking-widest text-zinc-400 w-1/3">Metric (USD)</th>
                                            {edgarData.periods.map(period => (
                                                <th key={period} className="pb-6 text-right text-sm font-black uppercase tracking-widest text-zinc-400">
                                                    {period}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        {Object.values(
                                            activeTab === 'income' ? edgarData.income_statement :
                                                activeTab === 'balance' ? edgarData.balance_sheet :
                                                    edgarData.cash_flow
                                        ).map((item: any) => (
                                            <tr key={item.concept} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                                <td className={`py-4 pr-4 ${item.is_total ? 'font-bold text-zinc-900 dark:text-white' : 'text-zinc-500'}`} style={{ paddingLeft: `${(item.depth || 0) * 1.5}rem` }}>
                                                    {item.label}
                                                </td>
                                                {edgarData.periods.map(period => (
                                                    <td key={period} className={`py-4 text-right font-medium ${item.is_total ? 'font-black' : ''}`}>
                                                        {item.values[period]?.display_value || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CompanyDetailPage;
