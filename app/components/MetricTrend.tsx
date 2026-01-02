'use client';

import React from 'react';

interface MetricTrendProps {
    periods: string[];
    values: number[];
    label?: string;
    color?: string;
    height?: number;
    showPoints?: boolean;
}

const MetricTrend = ({
    periods,
    values,
    label = "Trend Analysis",
    color = "#3b82f6",
    height = 160,
    showPoints = true
}: MetricTrendProps) => {
    const dataPoints = values.filter(v => v !== undefined && v !== null);

    if (dataPoints.length < 2) return <div className="h-40 flex items-center justify-center text-zinc-400 text-sm">Not enough data points for trend</div>;

    const max = Math.max(...dataPoints);
    const min = Math.min(...dataPoints);
    const range = max - min === 0 ? 1 : max - min;
    const width = 800;
    const padding = 20;

    const points = dataPoints.map((val, i) => ({
        x: (i / (dataPoints.length - 1)) * (width - 2 * padding) + padding,
        y: height - ((val - min) / range) * (height - 2 * padding) - padding
    }));

    const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const areaPath = `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

    const gradientId = `trendGradient-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="py-8 px-4 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-3xl mt-4 w-full">
            <div className="flex justify-between mb-4 px-2">
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{label}</span>
                <div className="flex gap-4">
                    <span className="text-xs font-bold text-green-500">Max: {max.toLocaleString()}</span>
                    <span className="text-xs font-bold text-red-500">Min: {min.toLocaleString()}</span>
                </div>
            </div>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40 overflow-visible">
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[0, 0.5, 1].map((p, i) => (
                    <line key={i} x1={padding} y1={padding + p * (height - 2 * padding)} x2={width - padding} y2={padding + p * (height - 2 * padding)} stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />
                ))}
                <path d={areaPath} fill={`url(#${gradientId})`} />
                <path d={linePath} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {showPoints && points.map((p, i) => (
                    <g key={i} className="group/point">
                        <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2" className="transition-all group-hover/point:r-6 cursor-pointer" />
                        <text x={p.x} y={p.y - 12} textAnchor="middle" className="text-[10px] font-bold fill-zinc-400 opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                            {dataPoints[i].toLocaleString()}
                        </text>
                    </g>
                ))}
            </svg>
            <div className="flex justify-between mt-4 px-2">
                {periods.map((p, i) => (
                    <span key={i} className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter truncate max-w-[50px]">{p}</span>
                ))}
            </div>
        </div>
    );
};

export default MetricTrend;
