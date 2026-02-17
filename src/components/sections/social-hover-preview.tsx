"use client";

import React, { useState, useEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";
import { personalInfo } from "@/config/personal";

// --- Types ---

export type SocialPlatform = "github" | "x" | "linkedin" | "leetcode";

export interface SocialProfile {
  platform: SocialPlatform;
  url: string;
  handle: string;
  displayName: string;
  headline: string;
  location?: string;
  avatarUrl?: string;
  stats?: {
    followers?: number | string;
    following?: number | string;
    connections?: number | string;
    rank?: string;
    streak?: string;
  };
}

interface PlatformPreset {
  container: string;       // Tailwind classes for the HoverCardContent wrapper
  avatarSize: string;      // Tailwind size classes for avatar (e.g. "size-12")
  avatarRadius: string;    // rounded-full or rounded-md etc
  hasCoverBanner: boolean; // LinkedIn-style top banner
  coverBannerClass?: string;
  nameClass: string;       // typography for display name
  handleClass: string;     // typography for handle
  headlineClass: string;   // typography for headline
  statsLabels: { key: keyof NonNullable<SocialProfile["stats"]>; label: string }[]; // what stats to show
  statsClass: string;      // typography for stats row
  statsValueClass: string; // typography for stat values (must contrast with container bg)
  locationClass: string;   // typography for location row
  ctaClass: string;        // CTA button styling
  ctaLabel: string;        // "View profile", "Follow", "Open profile", etc
  ctaIcon?: React.ReactNode;
  platformIconColor?: string; // small platform icon accent color
}

// --- Presets ---

const SOCIAL_PREVIEW_PRESETS: Record<SocialPlatform, PlatformPreset> = {
  github: {
    // Dark card matching GitHub's dark theme
    container: "w-[320px] p-0 bg-[#0d1117] border-[#30363d] text-[#e6edf3] shadow-lg rounded-lg overflow-hidden",
    avatarSize: "size-12",
    avatarRadius: "rounded-full",
    hasCoverBanner: false,
    nameClass: "text-sm font-semibold text-[#e6edf3]",
    handleClass: "text-xs text-[#7d8590]",
    headlineClass: "text-xs text-[#7d8590] leading-relaxed",
    statsLabels: [
      { key: "followers", label: "followers" },
      { key: "following", label: "following" },
    ],
    statsClass: "text-xs text-[#7d8590]",
    statsValueClass: "font-semibold text-[#e6edf3]",
    locationClass: "text-xs text-[#7d8590]",
    ctaClass: "bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium rounded-md px-3 py-1.5 transition-colors",
    ctaLabel: "View profile",
    platformIconColor: "#7d8590",
  },
  x: {
    // Dark card matching X/Twitter dark mode
    container: "w-[300px] p-0 bg-[#15202b] border-[#38444d] text-[#e7e9ea] shadow-lg rounded-2xl overflow-hidden",
    avatarSize: "size-14",
    avatarRadius: "rounded-full",
    hasCoverBanner: false,
    nameClass: "text-[15px] font-bold text-[#e7e9ea] leading-tight",
    handleClass: "text-[13px] text-[#71767b]",
    headlineClass: "text-[13px] text-[#e7e9ea] leading-normal",
    statsLabels: [
      { key: "following", label: "Following" },
      { key: "followers", label: "Followers" },
    ],
    statsClass: "text-[13px] text-[#71767b]",
    statsValueClass: "font-semibold text-[#e7e9ea]",
    locationClass: "text-[13px] text-[#71767b]",
    ctaClass: "bg-[#eff3f4] hover:bg-[#d7dbdc] text-[#0f1419] text-[13px] font-bold rounded-full px-4 py-1.5 transition-colors",
    ctaLabel: "View on X",
    platformIconColor: "#71767b",
  },
  linkedin: {
    // White/light card matching LinkedIn style — NOTE: must work in both light and dark site themes
    container: "w-[340px] p-0 bg-white border-[#e0e0e0] text-[#191919] shadow-lg rounded-lg overflow-hidden",
    avatarSize: "size-16",
    avatarRadius: "rounded-full",
    hasCoverBanner: true,
    coverBannerClass: "h-14 bg-gradient-to-r from-[#0a66c2] to-[#004182]",
    nameClass: "text-sm font-semibold text-[#191919]",
    handleClass: "text-xs text-[#666666]",
    headlineClass: "text-xs text-[#666666] leading-relaxed",
    statsLabels: [
      { key: "connections", label: "connections" },
    ],
    statsClass: "text-xs text-[#666666]",
    statsValueClass: "font-semibold text-[#191919]",
    locationClass: "text-xs text-[#666666]",
    ctaClass: "bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold rounded-full px-4 py-1.5 transition-colors",
    ctaLabel: "Connect",
    platformIconColor: "#0a66c2",
  },
  leetcode: {
    // Compact neutral/dark card matching LeetCode feel
    container: "w-[300px] p-0 bg-[#1a1a2e] border-[#333] text-[#eff1f6] shadow-lg rounded-lg overflow-hidden",
    avatarSize: "size-10",
    avatarRadius: "rounded-md",
    hasCoverBanner: false,
    nameClass: "text-sm font-semibold text-[#eff1f6]",
    handleClass: "text-xs text-[#8b8b8b]",
    headlineClass: "text-xs text-[#8b8b8b] leading-relaxed",
    statsLabels: [
      { key: "rank", label: "Rank" },
      { key: "streak", label: "Streak" },
    ],
    statsClass: "text-xs text-[#8b8b8b]",
    statsValueClass: "font-semibold text-[#eff1f6]",
    locationClass: "text-xs text-[#8b8b8b]",
    ctaClass: "bg-[#ffa116] hover:bg-[#e89500] text-[#1a1a2e] text-xs font-semibold rounded-md px-3 py-1.5 transition-colors",
    ctaLabel: "View profile",
    platformIconColor: "#ffa116",
  },
};

// --- Helper Functions ---

export function deriveHandle(platform: SocialPlatform, url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    let handle = "";

    switch (platform) {
      case "github":
        handle = pathParts[0] || "";
        break;
      case "x":
        handle = pathParts[0] || "";
        break;
      case "linkedin":
        // linkedin.com/in/{slug}
        handle = pathParts[1] || pathParts[0] || "";
        break;
      case "leetcode":
        // leetcode.com/u/{username}
        handle = pathParts[1] || pathParts[0] || "";
        break;
    }
    return handle ? `@${handle}` : "";
  } catch (e) {
    return "";
  }
}

// --- Icons ---

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.843 5.843 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function buildSocialProfiles(): { profile: SocialProfile; icon: React.ReactNode; label: string }[] {
  const items: { profile: SocialProfile; icon: React.ReactNode; label: string }[] = [];

  // GitHub
  if (personalInfo.socials.github) {
    const handle = deriveHandle("github", personalInfo.socials.github);
    // Remove @ for avatar construction if needed, but github avatars are by username
    const username = handle.replace("@", "");
    items.push({
      profile: {
        platform: "github",
        url: personalInfo.socials.github,
        handle,
        displayName: personalInfo.name,
        headline: "Building SaaS products with AI ☁️",
        avatarUrl: `https://github.com/${username}.png`,
        stats: {}, // Placeholders
      },
      icon: <GithubIcon className="h-4 w-4" />,
      label: "GitHub",
    });
  }

  // LinkedIn
  if (personalInfo.socials.linkedin) {
    items.push({
      profile: {
        platform: "linkedin",
        url: personalInfo.socials.linkedin,
        handle: deriveHandle("linkedin", personalInfo.socials.linkedin),
        displayName: personalInfo.name,
        headline: personalInfo.title,
        location: "Indonesia",
        stats: { connections: "500+" },
      },
      icon: <LinkedinIcon className="h-4 w-4" />,
      label: "LinkedIn",
    });
  }

  // LeetCode
  if (personalInfo.socials.leetcode) {
    items.push({
      profile: {
        platform: "leetcode",
        url: personalInfo.socials.leetcode,
        handle: deriveHandle("leetcode", personalInfo.socials.leetcode),
        displayName: personalInfo.name,
        headline: "Solving problems, one at a time",
        stats: { rank: "~200K", streak: "12 days" },
      },
      icon: <LeetCodeIcon className="h-4 w-4" />,
      label: "LeetCode",
    });
  }
  
  // X (Twitter) - Currently commented out in original file usage logic, but we include it here if the user uncommented/provided it in config
  // The requirements say "commented out matching current state".
  // However, buildSocialProfiles usually returns active profiles. 
  // If we want to support it but keep it disabled, we can check for existence.
  // Assuming personalInfo.socials.x exists in the config type, we'll add it if present.
  if (personalInfo.socials.x) {
     // Uncomment to enable X
     /*
     items.push({
      profile: {
        platform: "x",
        url: personalInfo.socials.x,
        handle: deriveHandle("x", personalInfo.socials.x),
        displayName: personalInfo.name,
        headline: "Building SaaS products with AI",
        stats: {},
      },
      icon: <XIcon className="h-4 w-4" />,
      label: "X",
    });
    */
  }

  return items;
}

// --- GitHub Stats Hook ---

/** Lazily fetch GitHub user stats from the public REST API (no auth needed). */
function useGitHubStats(username: string, enabled: boolean) {
  const [stats, setStats] = useState<{ followers: number; following: number } | null>(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!enabled || fetched || !username) return;
    setFetched(true);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.followers === "number") {
          setStats({ followers: data.followers, following: data.following });
        }
      })
      .catch(() => {
        // Silently fail — placeholders will show
      });
  }, [enabled, fetched, username]);

  return stats;
}

// --- Component ---

export function SocialHoverPreview({
  profile,
  icon,
  label,
}: {
  profile: SocialProfile;
  icon: React.ReactNode;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const preset = SOCIAL_PREVIEW_PRESETS[profile.platform];

  // Fetch GitHub stats lazily when the card opens
  const githubUsername = profile.platform === "github" ? profile.handle.replace("@", "") : "";
  const githubStats = useGitHubStats(githubUsername, isOpen && profile.platform === "github");

  // Merge live stats into profile stats
  const resolvedStats = React.useMemo(() => {
    if (profile.platform === "github" && githubStats) {
      return { ...profile.stats, followers: githubStats.followers, following: githubStats.following };
    }
    return profile.stats;
  }, [profile.platform, profile.stats, githubStats]);

  return (
    <HoverCard openDelay={120} closeDelay={200} open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2 py-1 bg-secondary hover:bg-accent transition-colors duration-200 select-none rounded-[6px] text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {icon}
          <span>{label}</span>
        </button>
      </HoverCardTrigger>
      
      <HoverCardContent
        side="top"
        sideOffset={8}
        className={`z-[100] ${preset.container}`}
      >
        {/* Cover Banner (LinkedIn style) */}
        {preset.hasCoverBanner && (
          <div className={preset.coverBannerClass} />
        )}

        {/* Content Body */}
        <div className="p-4 relative">
          {/* Header Row: Avatar + Name/Handle */}
          <div className={`flex justify-between items-start mb-3 ${preset.hasCoverBanner ? "-mt-8" : ""}`}>
            <div className="flex gap-3">
              <Avatar className={`${preset.avatarSize} ${preset.avatarRadius} ${preset.hasCoverBanner ? "ring-2 ring-white" : ""}`}>
                <AvatarImage src={profile.avatarUrl} alt={profile.handle} />
                <AvatarFallback className="bg-neutral-700 text-neutral-300 text-xs font-semibold">
                  {profile.handle.slice(1, 3).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {!preset.hasCoverBanner && (
                <div className="flex flex-col justify-center">
                  <div className={preset.nameClass}>{profile.displayName}</div>
                  <div className={preset.handleClass}>{profile.handle}</div>
                </div>
              )}
            </div>

            {/* Platform Icon (small accent) */}
            {preset.platformIconColor && (
              <div style={{ color: preset.platformIconColor }}>
                {icon}
              </div>
            )}
          </div>

          {/* LinkedIn Special Layout for Name */}
          {preset.hasCoverBanner && (
            <div className="mb-2">
              <div className={preset.nameClass}>{profile.displayName}</div>
              <div className={preset.handleClass}>{profile.handle}</div>
            </div>
          )}

          {/* Headline */}
          <div className={`mb-3 ${preset.headlineClass}`}>
            {profile.headline}
          </div>

          {/* Location */}
          {profile.location && (
            <div className={`flex items-center gap-1 mb-3 ${preset.locationClass}`}>
              <MapPin className="h-3 w-3" />
              <span>{profile.location}</span>
            </div>
          )}

          {/* Stats Row */}
          <div className={`flex gap-4 mb-4 ${preset.statsClass}`}>
            {preset.statsLabels.map((stat) => (
              <div key={stat.key} className="flex gap-1 items-center">
                <span className={preset.statsValueClass}>
                  {resolvedStats?.[stat.key] ?? "—"}
                </span>
                <span className="opacity-80">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full block text-center ${preset.ctaClass}`}
          >
             <div className="flex items-center justify-center gap-2">
              {preset.ctaIcon}
              {preset.ctaLabel}
            </div>
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
