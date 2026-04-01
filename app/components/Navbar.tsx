'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavLink {
    href?: string;
    label: string;
    colorClass: string;
    children?: NavLink[];
}

const links: NavLink[] = [
    { href: '/', label: 'Home', colorClass: 'hover:text-blue' },
    { href: '/work', label: 'Work', colorClass: 'hover:text-blue' },
    { href: '/build', label: 'Build', colorClass: 'hover:text-green' },
    { href: '/cycle', label: 'Cycle', colorClass: 'hover:text-red' },
    { href: '/read', label: 'Read', colorClass: 'hover:text-yellow' },
    { href: '/services', label: 'Services', colorClass: 'hover:text-blue', children: [
        { href: '/invest', label: 'Invest', colorClass: 'hover:text-blue' },
        { href: '/segmentation', label: 'Segmentation', colorClass: 'hover:text-blue' }
        ]
    }
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex glass items-center gap-8 px-8 py-3 rounded-full">
                {links.map((link) => (
                    link.children ? (
                        <div key={link.label} className="relative group">
                            <button className={`text-sm font-medium transition-colors ${link.colorClass} flex items-center gap-1`}>
                                {link.label}
                                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="glass px-6 py-4 rounded-2xl flex flex-col gap-3 min-w-[160px] items-center">
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href!}
                                            className={`text-sm font-medium whitespace-nowrap transition-colors ${child.colorClass}`}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            key={link.href}
                            href={link.href!}
                            className={`text-sm font-medium transition-colors ${link.colorClass}`}
                        >
                            {link.label}
                        </Link>
                    )
                ))}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden w-full max-w-sm relative flex flex-col items-center">
                <div className="glass w-full px-6 py-3 rounded-full flex justify-between items-center z-50">
                    <Link href="/" className="font-bold text-lg tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>
                        Bastian Scharnagl
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full mt-4 w-full glass rounded-[2rem] p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 text-center">
                        {links.map((link) => (
                            link.children ? (
                                <div key={link.label} className="flex flex-col gap-3 w-full border-y border-white/10 py-4">
                                    <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider">{link.label}</div>
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href!}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-lg font-medium transition-colors ${child.colorClass}`}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-lg font-medium py-2 ${link.colorClass}`}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
