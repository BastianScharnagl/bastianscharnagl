'use client';

import React from 'react';

const experiences = [
    {
        title: "Research Assistant",
        company: "Institute for Information Systems (iisys), Hof University of Applied Sciences",
        period: "Feb 2022 - Present",
        description: "Working in the Intelligent and Learning Systems research group. Focused on software development and intelligent system integration."
    },
    {
        title: "Software Developer",
        company: "Digital Vehicle Scan GmbH & Co. KG",
        period: "2020 - 2022",
        description: "Developed microcontroller controls and implemented AI-driven image processing for vehicle damage detection."
    },
    {
        title: "Diploma Student",
        company: "Hamm AG / TU Dresden",
        period: "2019 - 2020",
        description: "Evaluated the potential of 5G technology for rollers. Developed and implemented a 'Bandage Assistant'."
    },
    {
        title: "Student of Mechanical Engineering",
        company: "TU Dresden",
        period: "2015 - 2020",
        description: "Focused on high-level engineering principles, sensor integration, and IoT development."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-16 text-center">Professional Journey</h2>
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-primary/20 hover:border-primary transition-colors">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <div className="mb-1 text-sm font-semibold text-primary/80 uppercase tracking-wider">{exp.period}</div>
                            <h3 className="text-xl font-bold">{exp.title}</h3>
                            <div className="text-zinc-600 dark:text-zinc-400 font-medium mb-4">{exp.company}</div>
                            <p className="text-zinc-500 dark:text-zinc-500 max-w-2xl">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
