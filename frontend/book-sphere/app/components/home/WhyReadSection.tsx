"use client";

import React from "react";
import { Brain, Heart, Compass, BookOpen } from "lucide-react";

export default function WhyReadSection() {
  const benefits = [
    {
      icon: Brain,
      title: "Boost Brainpower",
      description:
        "Reading exercises your brain, improving memory, vocabulary, and cognitive performance.",
    },
    {
      icon: Heart,
      title: "Reduce Daily Stress",
      description:
        "Getting lost in a great book acts as a natural stress reliever, calming your nervous system.",
    },
    {
      icon: Compass,
      title: "Expand Perspective",
      description:
        "Explore worlds, histories, and cultural perspectives from authors across the globe.",
    },
    {
      icon: BookOpen,
      title: "Enhance Focus",
      description:
        "Deep reading trains your mind to concentrate, blocking out distractions in a digital age.",
    },
  ];

  return (
    <section
      id="benefits"
      className="bg-gray-50/70 border-y border-gray-100/50 py-20 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight sm:text-4xl">
            Why We Read
          </h2>
          <p className="text-gray-500 text-sm">
            Reading is more than a hobby—it's an investment in your mental
            well-being and intellectual horizon.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-purple-600 group-hover:text-white duration-300">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
