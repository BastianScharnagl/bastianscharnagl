'use client';

import React from 'react';

const projects = [
    {
        title: "5G Technology Evaluation",
        category: "Connectivity & Industrial IoT",
        description: "Assessment and implementation feasibility of 5G networks for industrial road rollers in collaboration with Hamm AG.",
        tech: ["5G", "IoT", "V2X"]
    },
    {
        title: "AI Damage Detection",
        category: "Computer Vision",
        description: "Deep learning models for processing vehicle images to automatically detect damages for Digital Vehicle Scan.",
        tech: ["Python", "OpenCV", "PyTorch"]
    },
    {
        title: "Bandage Assistant",
        category: "Embedded Systems",
        description: "Developed and implemented a real-time assistant system for rollers to optimize construction processes.",
        tech: ["C++", "Microcontrollers", "Sensors"]
    },
    {
        title: "IoT Dev Environment",
        category: "Software Tooling",
        description: "Integration of various sensors into a unified IoT development environment for streamlined prototyping.",
        tech: ["Node.js", "MQTT", "React"]
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-24 px-4 bg-card-bg/50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-16 text-center">Featured Work</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="glass p-8 rounded-3xl hover:translate-y-[-8px] transition-all group">
                            <div className="text-sm font-semibold text-accent mb-2">{project.category}</div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-xs font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
