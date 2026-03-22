'use client';

import React, { useEffect, useState } from 'react';
import image from '../../public/bastianscharnagl_github.jpg';

interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
    pushed_at: string;
}

const ProjectsPage = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/BastianScharnagl/repos?sort=updated&per_page=100');
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                const data = await response.json();
                const filteredRepos = data.filter((repo: any) => !repo.fork).sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
                setRepos(filteredRepos);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const getLanguageColor = (lang: string) => {
        const colors: { [key: string]: string } = {
            Python: 'bg-blue-500',
            TypeScript: 'bg-blue-600',
            JavaScript: 'bg-yellow-400',
            'C++': 'bg-pink-500',
            HTML: 'bg-green-500',
            CSS: 'bg-indigo-500',
            Shell: 'bg-green-500',
        };
        return colors[lang] || 'bg-zinc-400';
    };

    return (
        <div className="min-h-screen bg-background flex flex-col pt-32 pb-24 px-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-green-500/5 to-transparent -z-10" />

            <main className="flex-1 max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-green-500/20 shadow-xl shadow-green-500/10">
                            <img
                                src={"/bastianscharnagl_github.jpg"}
                                alt={`Bastian Scharnagl`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest rounded-full">Builder Profile</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                Life honing <span className="text-green-500">Skills</span>
                            </h1>
                        </div>
                    </div>
                    <a
                        href="https://www.github.com/BastianScharnagl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-green-500 text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2 mx-auto md:mx-0"
                    >
                        Connect on Github
                    </a>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2, 4, 6].map((n) => (
                            <div key={n} className="glass p-8 rounded-3xl animate-pulse h-64" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 glass rounded-3xl">
                        <p className="text-red-500 font-medium mb-4">Error: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {repos.map((repo) => (
                            <div key={repo.id} className="glass group p-8 rounded-3xl hover:border-primary/50 transition-all flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                                            <svg className="w-6 h-6 text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.103.79 2.222v3.293c0 .319.22.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors truncate max-w-[200px] md:max-w-xs" title={repo.name}>
                                            {repo.name}
                                        </h3>
                                    </div>
                                    <div className="flex gap-4 text-sm text-zinc-500">
                                        <span className="flex items-center gap-1 font-medium">
                                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                            {repo.stargazers_count}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-zinc-600 dark:text-zinc-400 mb-8 flex-1 line-clamp-2 text-base leading-relaxed">
                                    {repo.description || 'No description provided.'}
                                </p>

                                <div className="space-y-6">
                                    {repo.topics && repo.topics.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {repo.topics.slice(0, 4).map((topic, i) => (
                                                <span key={i} className="px-3 py-1 bg-primary/5 dark:bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider rounded-lg">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-6 border-t border-border-color">
                                        <div className="flex items-center gap-3">
                                            {repo.language && (
                                                <>
                                                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                                                    <span className="text-sm font-semibold">{repo.language}</span>
                                                </>
                                            )}
                                            <span className="text-xs text-zinc-400 ml-2 font-medium">
                                                Updated {new Date(repo.pushed_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2 bg-zinc-900 dark:bg-white dark:text-black text-white rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-lg"
                                        >
                                            Explore
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProjectsPage;
