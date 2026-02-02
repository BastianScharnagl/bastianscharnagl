'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MetricTrend from '@/app/components/MetricTrend';

interface StravaActivity {
    id: number;
    name: string;
    distance: number; // in meters
    moving_time: number; // in seconds
    average_speed: number; // in m/s
    total_elevation_gain: number; // in meters
    type: string;
    start_date: string;
    map: {
        summary_polyline: string;
    };
}

interface StravaProfile {
    profile: string;
    firstname: string;
    lastname: string;
}

interface StravaStats {
    ytd_ride_totals: {
        distance: number;
        elevation_gain: number;
        count: number;
    };
    all_ride_totals: {
        distance: number;
        elevation_gain: number;
        count: number;
    };
}

const PolylineMap = ({ encodedPolyline }: { encodedPolyline: string }) => {
    if (!encodedPolyline) return (
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 border border-border-color/50">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
    );

    // Decoding algorithm for Google's Encoded Polyline Format
    const decode = (encoded: string) => {
        let points = [];
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;
        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lng += dlng;
            points.push({ lat: lat / 1e5, lng: lng / 1e5 });
        }
        return points;
    };

    const points = decode(encodedPolyline);
    if (points.length < 2) return null;

    // Calculate bounds to scale points to SVG coordinate system (0-100)
    const lats = points.map(p => p.lat);
    const lngs = points.map(p => p.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat;
    const lngRange = maxLng - minLng;
    const maxRange = Math.max(latRange, lngRange);

    const scale = (val: number, min: number, range: number) => {
        return range === 0 ? 50 : ((val - min) / range) * 80 + 10;
    };

    // We flip the Y axis because SVG (0,0) is top-left
    const pathData = points.map((p, i) => {
        const x = scale(p.lng, minLng, maxRange);
        const y = 100 - scale(p.lat, minLat, maxRange);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-border-color/50 group-hover:border-orange-500/50 transition-colors">
            <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                <path
                    d={pathData}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-orange-500"
                />
            </svg>
        </div>
    );
};

const CyclingPage = () => {
    const [activities, setActivities] = useState<StravaActivity[]>([]);
    const [profile, setProfile] = useState<StravaProfile | null>(null);
    const [stats, setStats] = useState<StravaStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStravaData = async () => {
            try {
                const response = await fetch('/api/strava');
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to fetch Strava data');
                }
                const data = await response.json();
                setActivities(data.activities || []);
                setProfile(data.profile || null);
                setStats(data.stats || null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchStravaData();
    }, []);

    const formatDistance = (meters: number) => (meters / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 });
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="min-h-screen bg-background flex flex-col pt-32 pb-24 px-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/5 to-transparent -z-10" />

            <main className="flex-1 max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        {profile?.profile && (
                            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-orange-500/20 shadow-xl shadow-orange-500/10">
                                <img
                                    src={profile.profile}
                                    alt={`${profile.firstname} ${profile.lastname}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest rounded-full">Athlete Profile</span>
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-medium text-zinc-500">Live from Strava</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                Life on <span className="text-orange-500">Two Wheels</span>
                            </h1>
                        </div>
                    </div>
                    <a
                        href="https://www.strava.com/athletes/12019944"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-[#FC4C02] text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 mx-auto md:mx-0"
                    >
                        Follow on Strava
                    </a>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
                    {[
                        {
                            label: 'Yearly Distance',
                            value: stats ? formatDistance(stats.ytd_ride_totals.distance) : '...',
                            unit: 'km'
                        },
                        {
                            label: 'Yearly Elevation',
                            value: stats ? stats.ytd_ride_totals.elevation_gain.toLocaleString() : '...',
                            unit: 'm'
                        },
                        {
                            label: 'All-Time Rides',
                            value: stats ? stats.all_ride_totals.count.toLocaleString() : '...',
                            unit: ''
                        },
                        {
                            label: 'All-Time Dist.',
                            value: stats ? formatDistance(stats.all_ride_totals.distance) : '...',
                            unit: 'km'
                        },
                    ].map((stat, i) => (
                        <div key={i} className="glass p-6 md:p-8 rounded-[2rem] flex flex-col justify-between hover:translate-y-[-4px] transition-all">
                            <span className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">{stat.label}</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl md:text-4xl font-black">{stat.value}</span>
                                <span className="text-sm font-bold text-zinc-400">{stat.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance Graphs */}
                {!loading && activities.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8 rounded-[2.5rem]">
                            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-sm">km</span>
                                Monthly Distance
                            </h3>
                            {(() => {
                                const monthlyDist: { [key: string]: number } = {};
                                activities.forEach(a => {
                                    const date = new Date(a.start_date);
                                    const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
                                    monthlyDist[month] = (monthlyDist[month] || 0) + (a.distance / 1000);
                                });
                                const periods = Object.keys(monthlyDist).reverse();
                                const values = periods.map(p => monthlyDist[p]);
                                return <MetricTrend periods={periods} values={values} label="Monthly Distance (km)" color="#FC4C02" />;
                            })()}
                        </div>

                        <div className="glass p-8 rounded-[2.5rem]">
                            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-3">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                Speed Trend
                            </h3>
                            {(() => {
                                const lastRides = activities.filter(a => a.type === 'Ride').slice(0, 15).reverse();
                                const periods = lastRides.map(a => new Date(a.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
                                const values = lastRides.map(a => a.average_speed * 3.6);
                                return <MetricTrend periods={periods} values={values} label="Avg. Speed (km/h)" color="#10b981" />;
                            })()}
                        </div>

                        <div className="glass p-8 rounded-[2.5rem] lg:col-span-2">
                            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-3">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-7h1" /></svg>
                                Climbing Elevation (Recent Rides)
                            </h3>
                            {(() => {
                                const lastRides = activities.filter(a => a.type === 'Ride').slice(0, 20).reverse();
                                const periods = lastRides.map(a => new Date(a.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
                                const values = lastRides.map(a => a.total_elevation_gain);
                                return <MetricTrend periods={periods} values={values} label="Elevation Gain (m)" color="#8b5cf6" height={200} />;
                            })()}
                        </div>
                    </div>
                )}

                <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Recent Activities</h2>
                    <div className="h-[1px] flex-1 bg-border-color mx-8 hidden md:block" />
                    <span className="text-sm font-medium text-zinc-400">
                        {loading ? 'Loading...' : `Showing last ${activities.slice(0, 10).length} rides`}
                    </span>
                </div>

                {error && (
                    <div className="text-center py-20 glass rounded-[3rem] border-red-500/20">
                        <p className="text-red-500 font-medium mb-4">Error: {error}</p>
                        <p className="text-zinc-500 text-sm mb-6">Ensure STRAVA_CLIENT_ID, CLIENT_SECRET, and REFRESH_TOKEN are in .env</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold"
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="space-y-4">
                    {!loading && !error && activities.filter(a => a.type === 'Ride').slice(0, 10).map((activity) => (
                        <div key={activity.id} className="glass group p-6 rounded-[2.5rem] hover:border-orange-500/30 transition-all flex flex-col md:flex-row md:items-center gap-6">
                            <PolylineMap encodedPolyline={activity.map?.summary_polyline} />

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">{activity.name}</h3>
                                    <span className="text-sm font-medium text-zinc-400">{new Date(activity.start_date).toLocaleDateString()}</span>
                                </div>

                                <div className="flex flex-wrap gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-500">Distance:</span>
                                        <span className="font-bold">{(activity.distance / 1000).toFixed(1)} km</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-500">Climb:</span>
                                        <span className="font-bold">+{activity.total_elevation_gain}m</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-500">Time:</span>
                                        <span className="font-bold">{formatTime(activity.moving_time)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-500">Speed:</span>
                                        <span className="font-bold">{(activity.average_speed * 3.6).toFixed(1)} km/h</span>
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 flex items-center justify-end">
                                <a
                                    href={`https://www.strava.com/activities/${activity.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="space-y-4">
                            {[1, 2, 3].map(n => (
                                <div key={n} className="glass p-6 rounded-[2.5rem] animate-pulse h-32" />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CyclingPage;
