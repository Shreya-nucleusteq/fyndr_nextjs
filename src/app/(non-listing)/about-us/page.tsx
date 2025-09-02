"use client";

import React, { useState } from "react";

import { SITE_ABOUT } from "@/constants/site";

import AboutRow from "./_components/about-row";
import AboutUsTab from "./_components/about-us-tab";
import FeatureCard from "./_components/feature-cards";

const AboutUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <main className="scroll-smooth">
      <section className="relative flex flex-col items-center justify-center gap-4 p-4 md:flex-row">
        {SITE_ABOUT.features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            imgURL={feature.imgURL}
            description={feature.description}
            index={index}
            isFirst={index === 0}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </section>

      <section className="flex flex-col items-center gap-8 bg-secondary-10 p-4 py-10">
        {SITE_ABOUT.aboutAndMission.map((item) => (
          <AboutRow
            key={item.title}
            imgURL={item.imgURL}
            title={item.title}
            content={item.content}
            imgDir={item.imgDir}
          />
        ))}
      </section>
      <section className="bg-white pt-5 ">
        <h1 className="title-2 text-center">Joining as a ?</h1>
        <AboutUsTab />
      </section>
    </main>
  );
};

export default AboutUs;
