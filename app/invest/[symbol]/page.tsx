'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MetricTrend from '@/app/components/MetricTrend';

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
    //const [yahooData, setYahooData] = useState<YahooData | null>(null);
    const [edgarData, setEdgarData] = useState<EdgarData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'income' | 'balance' | 'cashflow'>('income');
    const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                /*const yResponse = await fetch(`/api/yahoo/${symbol}`);
                const yJson = await yResponse.json();*/
                const eResponse = await fetch(`/api/edgar/${symbol}`);
                const eJson = await eResponse.json();
                //if (yJson.error) throw new Error(yJson.error);
                //setYahooData(yJson);
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

    if (error) return (
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

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-4 relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent -z-10" />

            <main className="max-w-7xl mx-auto w-full">
                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl w-fit mb-8">
                    {['income', 'balance', 'cashflow'].map((tab) => (
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

                <div className="min-h-[600px]">
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
                                            <React.Fragment key={item.concept}>
                                                <tr
                                                    onClick={() => setExpandedConcept(expandedConcept === item.concept ? null : item.concept)}
                                                    className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors cursor-pointer group/row ${expandedConcept === item.concept ? 'bg-zinc-50/80 dark:bg-zinc-800/40' : ''}`}
                                                >
                                                    <td className={`py-4 pr-4 flex items-center gap-3 ${item.is_total ? 'font-bold text-zinc-900 dark:text-white' : 'text-zinc-500'}`} style={{ paddingLeft: `${(item.depth || 0) * 1.5 + 1}rem` }}>
                                                        <svg className={`w-3 h-3 transition-transform text-zinc-300 group-hover/row:text-blue-500 ${expandedConcept === item.concept ? 'rotate-90 text-blue-500' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                                                        {item.label}
                                                    </td>
                                                    {edgarData.periods.map(period => (
                                                        <td key={period} className={`py-4 text-right font-medium ${item.is_total ? 'font-black' : ''}`}>
                                                            {item.values[period]?.display_value || '-'}
                                                        </td>
                                                    ))}
                                                </tr>
                                                {expandedConcept === item.concept && (
                                                    <tr>
                                                        <td colSpan={edgarData.periods.length + 1} className="py-2 px-8">
                                                            {(() => {
                                                                const sortedPeriods = [...edgarData.periods].sort((a, b) => {
                                                                    const getYear = (p: string) => {
                                                                        const matches = p.match(/\d{4}/);
                                                                        return matches ? parseInt(matches[0]) : 0;
                                                                    };
                                                                    const getOrder = (p: string) => {
                                                                        if (p.includes('Q1')) return 1;
                                                                        if (p.includes('Q2')) return 2;
                                                                        if (p.includes('Q3')) return 3;
                                                                        if (p.includes('Q4')) return 4;
                                                                        if (p.includes('FY')) return 5;
                                                                        return 0;
                                                                    };
                                                                    const yearA = getYear(a);
                                                                    const yearB = getYear(b);
                                                                    if (yearA !== yearB) return yearA - yearB;
                                                                    return getOrder(a) - getOrder(b);
                                                                });
                                                                const trendValues = sortedPeriods.map(p => item.values[p]?.raw_value).filter(v => v !== undefined && v !== null);
                                                                return <MetricTrend periods={sortedPeriods} values={trendValues} />;
                                                            })()}
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
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
