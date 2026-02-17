"use client";

import React from 'react';
import Image from 'next/image';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiC,
  SiAmazonwebservices,
  SiGit,
  SiGithub,
  SiKubernetes,
  SiDocker,
  SiJest,
  SiPostman,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiNextdotjs,
  SiExpress,
  SiPandas,
  SiTailwindcss,
  SiPytorch,
  SiTensorflow,
  SiJupyter,
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';

interface Skill {
  name: string;
  icon?: React.ReactNode;
  color?: string;
}

const languageSkills: Skill[] = [
  { name: 'Python', icon: <SiPython className="size-3" />, color: '#3776AB' },
  { name: 'Java', icon: <FaJava className="size-3" />, color: '#ED8B00' },
  { name: 'JavaScript', icon: <SiJavascript className="size-3" />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript className="size-3" />, color: '#3178C6' },
  { name: 'SQL', icon: <FaDatabase className="size-3" />, color: '#336791' },
  { name: 'C', icon: <SiC className="size-3" />, color: '#A8B9CC' },
];

const toolsSkills: Skill[] = [
  { name: 'AWS', icon: <SiAmazonwebservices className="size-3" />, color: '#FF9900' },
  { name: 'Git', icon: <SiGit className="size-3" />, color: '#F05032' },
  { name: 'GitHub', icon: <SiGithub className="size-3" />, color: '#171515' },
  { name: 'Kubernetes', icon: <SiKubernetes className="size-3" />, color: '#326CE5' },
  { name: 'Docker', icon: <SiDocker className="size-3" />, color: '#2496ED' },
  { name: 'Jest', icon: <SiJest className="size-3" />, color: '#C21325' },
  { name: 'Postman', icon: <SiPostman className="size-3" />, color: '#FF6C37' },
];

const frameworkSkills: Skill[] = [
  { name: 'React', icon: <SiReact className="size-3" />, color: '#61DAFB' },
  { name: 'Node.js', icon: <SiNodedotjs className="size-3" />, color: '#339933' },
  { name: 'PostgreSQL', icon: <SiPostgresql className="size-3" />, color: '#4169E1' },
  { name: 'Redis', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" width={12} height={12} className="transition-all duration-200" />, color: 'image' },
  { name: 'Next.js', icon: <SiNextdotjs className="size-3" />, color: '#171515' },
  { name: 'Express.js', icon: <SiExpress className="size-3" />, color: '#171515' },
  { name: 'Tailwind', icon: <SiTailwindcss className="size-3" />, color: '#06B6D4' },
  { name: 'pandas', icon: <SiPandas className="size-3" />, color: '#150458' },
  { name: 'PyTorch', icon: <SiPytorch className="size-3" />, color: '#EE4C2C' },
  { name: 'TensorFlow', icon: <SiTensorflow className="size-3" />, color: '#FF6F00' },
  { name: 'Jupyter', icon: <SiJupyter className="size-3" />, color: '#F37626' },
];

const SkillBadge = ({ skill }: { skill: Skill }) => {
  const isImageIcon = skill.color === 'image';
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="group flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-[6px] border border-transparent hover:border-border transition-all duration-200 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`transition-all duration-200 ${isImageIcon ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' : ''}`}
        style={!isImageIcon ? { color: isHovered ? skill.color : 'var(--muted-foreground)' } : undefined}
      >
        {skill.icon}
      </span>
      <span className="text-[13px] font-medium text-foreground">{skill.name}</span>
    </div>
  );
};

const SkillsAndSponsors = () => {
  return (
    <section className="relative z-50 bg-background">
      <div className="relative p-3">
        <h2 className="text-lg font-semibold text-title select-none">My skills.</h2>
      </div>
      <div className="dashed-separator"></div>
      <div className="relative p-3 py-6">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {languageSkills.map((skill, idx) => (
              <SkillBadge key={idx} skill={skill} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {toolsSkills.map((skill, idx) => (
              <SkillBadge key={idx} skill={skill} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {frameworkSkills.map((skill, idx) => (
              <SkillBadge key={idx} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsAndSponsors;
