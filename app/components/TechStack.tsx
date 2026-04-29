'use client';

import React from 'react';

const TechStack = () => {
    const technologies = [
        { category: "Core", items: ["C", "C++", "C#", "Python", "TypeScript"] },
        { category: "Protocols", items: ["I2C", "RS485", "CAN", "MQTT"] },
        { category: "Web Frameworks", items: ["Next.js", "FastAPI"] },
        { category: "Data & AI", items: ["OpenCV", "PyTorch", "Pandas", "Scikit-Learn"] },
        { category: "Infrastructure", items: ["Linux", "Docker", "Git"] },
    ];

    return (
        <section className="py-24 px-4 bg-background">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-zinc-600 dark:text-zinc-300 mb-12 text-center">Tech Stack</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {technologies.map((tech, index) => (
                        <div key={index} className="glass p-6 rounded-2xl hover:border-primary/30 transition-all">
                            <h3 className="text-primary font-bold mb-4 uppercase text-sm tracking-wider">{tech.category}</h3>
                            <ul className="space-y-2">
                                {tech.items.map((item, i) => (
                                    <li key={i} className="text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
