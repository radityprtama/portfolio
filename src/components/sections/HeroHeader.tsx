"use client";

import React from "react";
import Image from "next/image";
import { Mail, Calendar, Eye } from "lucide-react";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme-transition";
import { SocialHoverPreview, buildSocialProfiles } from "@/components/sections/social-hover-preview";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { personalInfo } from "@/config/personal";

interface ContributionDay {
  contributionCount: number;
  date: string;
  level: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface MonthLabel {
  label: string;
  weekIndex: number;
}

const HeroHeader = () => {
  const [contributionData, setContributionData] = React.useState<
    ContributionDay[][]
  >([]);
  const [totalContributions, setTotalContributions] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [monthLabels, setMonthLabels] = React.useState<MonthLabel[]>([]);
  const [visitorCount, setVisitorCount] = React.useState<number | null>(null);

  // Visitor Count Effect
  React.useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem("visited");
        const method = hasVisited ? "GET" : "POST";

        const res = await fetch("/api/visitor-count", {
          method,
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          setVisitorCount(data.count);
          if (!hasVisited) {
            sessionStorage.setItem("visited", "true");
          }
        }
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };

    fetchVisitorCount();
  }, []);

  // Convert contribution count to level (0-4)
  const getContributionLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  // Format date for tooltip (parse as local date to avoid timezone shifts)
  const formatDate = (dateStr: string): string => {
    // Parse YYYY-MM-DD as local date, not UTC
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get month labels with positions (parse as local date to avoid timezone shifts)
  const getMonthLabels = (weeks: ContributionWeek[]): MonthLabel[] => {
    const labels: MonthLabel[] = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      if (week.contributionDays.length > 0) {
        const firstDay = week.contributionDays[0];
        // Parse YYYY-MM-DD as local date, not UTC
        const [, monthStr] = firstDay.date.split("-");
        const month = parseInt(monthStr, 10) - 1;

        if (month !== lastMonth) {
          labels.push({ label: monthNames[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    // Filter out months with insufficient weeks (not enough space for label)
    const totalWeeks = weeks.length;
    return labels.filter((label, idx) => {
      if (idx === labels.length - 1) {
        // Last label: only show if at least 2 weeks visible from this month
        return totalWeeks - label.weekIndex >= 2;
      }
      const nextLabel = labels[idx + 1];
      return nextLabel.weekIndex - label.weekIndex >= 3; // Need at least 3 weeks gap
    });
  };

  React.useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();

        if (data.error) {
          console.error("GitHub API error:", data.error);
          setIsLoading(false);
          return;
        }

        // Only show last 51 weeks to fit within the container
        const recentWeeks = data.weeks.slice(-51);

        setTotalContributions(data.totalContributions);
        setMonthLabels(getMonthLabels(recentWeeks));

        // Transform weeks data into grid format with full day info
        const grid = recentWeeks.map((week: ContributionWeek) =>
          week.contributionDays.map(
            (day: { contributionCount: number; date: string }) => ({
              ...day,
              level: getContributionLevel(day.contributionCount),
            }),
          ),
        );

        setContributionData(grid);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-[#ebedf0] dark:bg-[#161b22]";
      case 1:
        return "bg-[#c4c8cf] dark:bg-[#0e4429]";
      case 2:
        return "bg-[#8b929c] dark:bg-[#006d32]";
      case 3:
        return "bg-[#5c636e] dark:bg-[#26a641]";
      case 4:
        return "bg-[#2d3340] dark:bg-[#39d353]";
      default:
        return "bg-[#ebedf0] dark:bg-[#161b22]";
    }
  };

  return (
    <header className="w-full" role="banner" itemScope itemType="https://schema.org/Person">
      <div className="relative z-50 bg-background transition-colors duration-300">
        <div className="relative p-3">
          <div className="w-full h-[60px] sm:h-[140px] dot-grid"></div>
        </div>
        <div className="dashed-separator"></div>
      </div>

      <div className="relative z-50 bg-background transition-colors duration-300">
        <div className="relative p-3">
          <div className="flex items-stretch justify-between relative">
            <div className="flex items-end gap-3">
              {/* Profile image with animation */}
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0 }}
              >
                <div className="border border-border rounded-[12px] p-[4px] cursor-pointer hover:brightness-90 transition duration-300 bg-background">
                  <Image
                    alt="Raditya Alia Pratama — Aspiring AI Engineer and SaaS Builder"
                    width={90}
                    height={90}
                    className="rounded-[8px] select-none object-cover"
                    src={personalInfo.profileImage}
                  />
                </div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://github.com/kaltdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full border-2 border-background overflow-hidden shadow-sm hover:opacity-80 transition-opacity"
                      >
                        <Image
                          alt="KaltLabs"
                          width={28}
                          height={28}
                          className="object-cover w-full h-full"
                          src="/kaltlabs.png"
                        />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={5}
                      className="z-[100]"
                    >
                      <p className="text-primary-foreground/70">KaltLabs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>

              {/* Name and title with animation */}
              <div className="flex flex-col justify-end h-full py-1 select-none">
                <div>
                  <motion.h1
                    className="text-[1.55rem] font-bold leading-[1.08] text-title relative inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                  >
                    {personalInfo.name}
                  </motion.h1>
                  <motion.div
                    className="mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
                  >
                    <span className="text-muted-foreground text-sm">
                      {personalInfo.title}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Theme Toggle & Visitor Count */}
            <div className="flex flex-col items-end gap-7 py-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <ThemeToggle />
              </motion.div>
              {visitorCount !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground/80 font-medium select-none bg-secondary/50 px-2 py-1 rounded-full border border-border/50 backdrop-blur-sm"
                >
                  <Eye size={12} className="text-primary/70" />
                  <span>{visitorCount.toLocaleString()}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div className="dashed-separator"></div>
      </div>

      <div className="relative">
        <div className="relative p-3">
          {/* Summary/Bio section with animation */}
          <motion.div
            className="flex flex-col gap-4 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
          >
            <p className="text-[0.875rem] leading-[1.6]">
              Hey! I&apos;m Raditya, a third-year vocational high school student
              at SMK Nusantara 1. I&apos;m interested in building SaaS products
              with AI, and currently learning how to become an AI engineer.
            </p>
            <p className="text-[0.875rem] leading-[1.6]">
              I love turning ideas into real products and I&apos;m always
              exploring new ways to build with AI.
            </p>
          </motion.div>

          {/* CTA buttons with animation */}
          <motion.div
            className="flex pt-6 gap-2 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.8 }}
          >
            <a
              className="w-fit flex items-center bg-primary hover:bg-action-hover transition-colors duration-300 gap-1.5 px-3 py-2 text-primary-foreground text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden"
              href={personalInfo.calLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-4 h-4 overflow-hidden">
                <Calendar
                  className="absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-y-6"
                  size={16}
                />
                <Calendar
                  className="absolute inset-0 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0"
                  size={16}
                />
              </div>
              Book an intro call
            </a>

            <a
              className="w-fit flex items-center gap-1.5 px-3 py-2 bg-secondary hover:bg-accent transition-colors duration-300 text-sm text-foreground font-medium border border-border cursor-pointer rounded-[9px] group overflow-hidden"
              href={`mailto:${personalInfo.email}`}
            >
              <div className="relative w-4 h-4 overflow-hidden">
                <Mail
                  className="absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-y-6"
                  size={16}
                />
                <Mail
                  className="absolute inset-0 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0"
                  size={16}
                />
              </div>
              Send an email
            </a>

            {/* <a
              className="w-fit flex items-center gap-1.5 px-3 py-2 bg-secondary hover:bg-accent transition-colors duration-300 text-sm text-foreground font-medium border border-border cursor-pointer rounded-[9px] group overflow-hidden"
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-4 h-4 overflow-hidden">
                <FileText className="absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-y-6" size={16} />
                <FileText className="absolute inset-0 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0" size={16} />
              </div>
              View resume
            </a> */}
          </motion.div>

          {/* Socials section with animation */}
          <motion.div
            className="py-8 flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 1.0 }}
          >
            <h2 className="text-sm font-medium text-foreground">
              Here are my{" "}
              <span className="font-semibold text-title">socials</span>
            </h2>
              <div className="flex gap-2 items-center flex-wrap">
                {buildSocialProfiles().map((item) => (
                  <SocialHoverPreview
                    key={item.profile.platform}
                    profile={item.profile}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
              </div>
          </motion.div>

          <div className="w-full flex flex-col justify-center select-none h-[130px]">
            {!isLoading && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div className="overflow-x-auto">
                  <div className="min-w-max">
                    <motion.div
                      className="relative mb-3 h-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {monthLabels.map((month, idx) => (
                        <span
                          key={idx}
                          className="absolute text-[10px] text-muted-foreground"
                          style={{ left: `${month.weekIndex * 13}px` }}
                        >
                          {month.label}
                        </span>
                      ))}
                    </motion.div>
                    <div className="flex gap-[3px]">
                      <TooltipProvider delayDuration={0}>
                        {contributionData.map(
                          (week: ContributionDay[], weekIdx: number) => (
                            <motion.div
                              key={weekIdx}
                              className="flex flex-col gap-[3px]"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.15 + weekIdx * 0.012,
                                ease: [0.21, 0.47, 0.32, 0.98],
                              }}
                            >
                              {week.map(
                                (day: ContributionDay, dayIdx: number) => (
                                  <Tooltip key={`${weekIdx}-${dayIdx}`}>
                                    <TooltipTrigger asChild>
                                      <div
                                        className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(day.level)} hover:opacity-80 transition-opacity duration-300 cursor-pointer`}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      sideOffset={5}
                                      className="z-[100]"
                                    >
                                      <p className="text-primary-foreground/70">
                                        {day.contributionCount} contribution
                                        {day.contributionCount !== 1 ? "s" : ""}
                                      </p>
                                      <p className="text-primary-foreground/70">
                                        {formatDate(day.date)}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                ),
                              )}
                            </motion.div>
                          ),
                        )}
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="flex justify-between items-end mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <span className="text-[11px] text-muted-foreground">
                    {totalContributions.toLocaleString()} contributions in the
                    last year
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-1">
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#ebedf0] dark:bg-[#161b22]"></div>
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#c4c8cf] dark:bg-[#0e4429]"></div>
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#8b929c] dark:bg-[#006d32]"></div>
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#5c636e] dark:bg-[#26a641]"></div>
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#2d3340] dark:bg-[#39d353]"></div>
                    </div>
                    <span>More</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="dashed-separator mt-6"></div>
      </div>
    </header>
  );
};

export default HeroHeader;
