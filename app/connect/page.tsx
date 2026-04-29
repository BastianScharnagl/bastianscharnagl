import Image from 'next/image';
import React from 'react';

const socialAccounts = [
  {
    profilePicture: '/profile_research.jpg',
    activity: 'Research',
    platform: 'ORCID',
    url: 'https://orcid.org/0009-0003-4415-1660',
    label: 'OR',
    accent: 'bg-[#A6CE39] text-slate-900',
  },
  {
    profilePicture: '/bastianscharnagl_linkedin.jpg',
    activity: 'Work',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/bastianscharnagl',
    label: 'in',
    accent: 'bg-[#0077B5] text-white',
  },
  {
    profilePicture: '/bastianscharnagl_github.jpg',
    activity: 'Tinker',
    platform: 'GitHub',
    url: 'https://github.com/BastianScharnagl',
    label: 'GH',
    accent: 'bg-[#24292F] text-white',
  },
  {
    profilePicture: '/bastianscharnagl_strava.jpg',
    activity: 'Sports',
    platform: 'Strava',
    url: 'https://www.strava.com/athletes/12019944',
    label: 'S',
    accent: 'bg-[#FC4C02] text-white',
  },
  {
    profilePicture: '/profile_substack.jpg',
    activity: 'Thoughts',
    platform: 'Substack',
    url: 'https://bastianscharnagl.substack.com/',
    label: 'SB',
    accent: 'bg-[#FF6719] text-white',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-32 pb-24 px-4 text-[var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        <div className="grid gap-4 sm:gap-5">
          {socialAccounts.map((account) => (
            <article
              key={account.platform}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 p-6 shadow-sm transition duration-300 hover:shadow-lg hover:border-slate-300/50 dark:hover:border-slate-700/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                <div className={`absolute -inset-full blur-3xl ${account.accent.split(' ')[0]}/10 group-hover:animate-pulse`} />
              </div>

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {account.profilePicture ? (
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700 shadow-md">
                      <Image
                        src={account.profilePicture}
                        alt={`${account.platform} profile picture`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`flex h-16 w-16 flex-none items-center justify-center rounded-xl ${account.accent} text-lg font-bold shadow-md`}>
                      {account.label}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                      {account.activity}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                      {account.platform}
                    </h2>
                  </div>
                </div>

                <a
                  href={account.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex-shrink-0 ${
                    account.platform === 'ORCID'
                      ? 'bg-[#A6CE39] text-slate-900 hover:bg-[#95B833]'
                      : account.platform === 'LinkedIn'
                      ? 'bg-[#0077B5] hover:bg-[#005885]'
                      : account.platform === 'GitHub'
                      ? 'bg-[#24292F] hover:bg-[#1F2328]'
                      : account.platform === 'Strava'
                      ? 'bg-[#FC4C02] hover:bg-[#E34201]'
                      : 'bg-[#FF6719] hover:bg-[#E55A15]'
                  }`}
                >
                  <span className="hidden sm:inline">Connect</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
