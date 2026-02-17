"use client";

import React from "react";
import Image from "next/image";

const researchPrompt = `Deep Research: Raditya Alia Pratama from SMK Nusantara 1

IMPORTANT: Focus ONLY on Raditya Alia Pratama - a vocational high school student at SMK Nusantara 1. Look ONLY into these specific URLs and sources provided below.

As a potential collaborator or teammate, I want to concretely understand who Raditya is, what he builds, and how he operates.
Use all available research capabilities - web search, content analysis, cross-referencing sources, and synthesis - to build a comprehensive profile. Go deep, not surface-level.

Professional Background

Review his current activities as a vocational student interested in building SaaS products with AI
Search for any public mentions, projects, or references to his work
What does his work reveal about his growth trajectory and the types of problems he gravitates toward?


Online Presence & Portfolio
LinkedIn (https://www.linkedin.com/in/radityaapratama/)

Walk through his profile thoroughly - what story does his experience tell?
What endorsements, recommendations, or notable connections stand out?

GitHub (https://github.com/radityprtama)

Analyze his repository history - what has he built, and what's the scope of each project?
Examine commit frequency, activity patterns, and consistency over time
What languages, frameworks, and tools dominate his work?
Review code quality - structure, documentation, README thoroughness, testing practices
Are there standout open-source contributions, forks, or collaborations?

X / Twitter (https://x.com/radibyp)

What topics does he engage with?
What does his activity reveal about his interests and community involvement?

LeetCode (https://leetcode.com/u/zurravie/)

What does his problem-solving activity reveal about his technical foundations?


Technical Profile

Synthesize across all sources: what is his core technical stack and where is he strongest?
What types of systems has he built?
What does the quality and architecture of his code reveal about his engineering maturity?


Trajectory & Ambitions

Where is he headed in the next 1-3 years?
What signals suggest his long-term goals?
What patterns in his choices reveal what he optimizes for?


Synthesis
Compile all findings into a clear, honest profile of Raditya:

Who he is and what drives him
What he's strongest at and where he's still growing
What the experience of working with him would actually be like
Whether he'd be a good fit for [your specific opportunity]

Explain it simply and directly - as if you were briefing someone before their first meeting with him.`;

const encodedPrompt = encodeURIComponent(researchPrompt);

/**
 * Footer Component
 * Includes:
 * 1. AI Summary section with links to various AI assistants.
 * 2. Decorative dot-grid footer block.
 */
export default function NewsletterFooter() {
  return (
    <footer className="w-full">
      {/* AI Summary Section */}
      <div className="relative z-50 bg-background">
        <div className="relative p-8 flex flex-col items-center text-center">
          <h3 className="text-[18px] md:text-[20px] font-medium leading-[1.4] text-title tracking-tight mb-5">
            Request an AI summary of Raditya.
          </h3>

          <div className="flex items-center gap-6 mb-6">
            {/* ChatGPT */}
            <a
              href={`https://chatgpt.com/?q=${encodedPrompt}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              title="Ask ChatGPT about Raditya"
            >
              <Image src="/chatgpt-logo.png" alt="ChatGPT" width={28} height={28} />
            </a>

            {/* Gemini */}
            <a
              href={`https://www.google.com/search?udm=50&q=${encodedPrompt}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              title="Ask Gemini about Raditya"
            >
              <Image src="/gemini-logo.png" alt="Gemini" width={28} height={28} />
            </a>

            {/* Claude */}
            <a
              href={`https://claude.ai/new?q=${encodedPrompt}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              title="Ask Claude about Raditya"
            >
              <Image src="/black-claude.png" alt="Claude" width={28} height={28} />
            </a>

            {/* Grok */}
            <a
              href={`https://grok.com/?q=${encodedPrompt}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              title="Ask Grok about Raditya"
            >
              <Image src="/grok-logo.webp" alt="Grok" width={28} height={28} />
            </a>
          </div>
        </div>
        <div className="dashed-separator"></div>
      </div>

      {/* Decorative Footer Block */}
      <div className="relative z-50 bg-background">
        <div className="relative p-3">
          <div className="w-full h-[60px] sm:h-[100px] dot-grid"></div>
        </div>
      </div>
    </footer>
  );
}