import React from 'react';
import { Mail, Github, Linkedin, MoreHorizontal } from 'lucide-react';

const AboutAndSocials = () => {
  // Mock contribution data for the heatmap visualization
  const contributionGrid = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-[#ebedf0]';
      case 1: return 'bg-[#d1d5db]';
      case 2: return 'bg-[#9ca3af]';
      case 3: return 'bg-[#6b7280]';
      case 4: return 'bg-[#374151]';
      default: return 'bg-[#ebedf0]';
    }
  };

  const socials = [
    { name: 'GitHub', icon: <Github size={14} />, url: 'https://github.com/radityprtama' },
    { name: 'LinkedIn', icon: <Linkedin size={14} />, url: 'https://www.linkedin.com/in/radityaapratama/' },
  ];

  return (
    <section className="relative">
      <div className="max-w-[690px] mx-auto px-4.5 sm:px-8 md:px-4.5 pt-3 pb-6">
        {/* Introduction Bio */}
        <div className="flex flex-col gap-4 text-[0.875rem] leading-[1.6] text-foreground">
          <p>
            Hey, I&apos;m Raditya, a third-year vocational high school student at SMK Nusantara 1 who loves building SaaS products with AI and learning how to become an AI engineer.
          </p>
          <p>
            I&apos;m always open for new opportunities to learn and grow.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex pt-6 gap-2 select-none">
          <a
            href="mailto:hi@pratama.dev"
            className="w-fit flex items-center bg-[#404040] hover:bg-[#262626] transition-colors duration-300 gap-1.5 px-3 py-[7px] text-white text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden"
          >
            <div className="relative w-4 h-4 overflow-hidden">
              <Mail
                size={16}
                className="absolute inset-0 transition-transform duration-400 ease-out group-hover:-translate-y-6"
              />
              <Mail
                size={16}
                className="absolute inset-0 translate-y-6 transition-transform duration-400 ease-out group-hover:translate-y-0"
              />
            </div>
            Get in touch
          </a>
          <a
            href="mailto:hi@pratama.dev"
            className="w-fit flex items-center gap-1.5 px-3 py-[7px] bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors duration-300 text-sm text-foreground font-medium border border-border cursor-pointer rounded-[9px] group overflow-hidden"
          >
            <Mail
              size={18}
              className="translate-y-0 group-hover:animate-bounce transition-transform duration-300"
            />
            Send an email
          </a>
        </div>

        {/* Social Links Section */}
        <div className="py-8 flex flex-col gap-3">
          <h2 className="text-[1.125rem] font-semibold leading-normal text-black">
            Here are my <span className="font-medium text-black">socials</span>
          </h2>
          <div className="flex gap-[7px] items-center flex-wrap">
            {socials.map((social) => (
              <div key={social.name} className="relative inline-block">
                <a
                  href={social.url}
                  className="flex items-center px-2 py-1 bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors duration-200 select-none rounded-[6px]"
                >
                  <span className="flex items-center text-foreground">
                    {social.icon}
                  </span>
                  <span className="ml-1.5 text-sm font-medium text-foreground">
                    {social.name}
                  </span>
                </a>
              </div>
            ))}
            <div className="relative">
              <div className="flex items-center group text-foreground px-2 cursor-pointer py-1 bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors duration-200 select-none rounded-[6px]">
                <MoreHorizontal size={14} />
                <span className="ml-1.5 text-sm font-medium text-foreground">More</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Contribution Heatmap */}
        <div>
          <div className="w-full flex flex-col justify-center select-none">
            <div className="w-full overflow-hidden border border-border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-muted-foreground flex gap-4">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </span>
              </div>
              <div className="flex gap-[3px]">
                {contributionGrid.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {week.map((level, dayIdx) => (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(level)} hover:opacity-80 transition-opacity duration-300`}
                        title={`${level} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-end mt-4">
                <span className="text-[11px] text-muted-foreground">1,562 activities in 2025</span>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#ebedf0]"></div>
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#d1d5db]"></div>
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#9ca3af]"></div>
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#6b7280]"></div>
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#374151]"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-border mt-2"></div>
    </section>
  );
};

export default AboutAndSocials;
