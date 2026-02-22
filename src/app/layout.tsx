import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeTransitionProvider } from "@/components/theme-transition";
import { personalInfo, siteConfig } from "@/config/personal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  // ─── Core ───────────────────────────────────────────────
  title: {
    default: `${personalInfo.name} | Aspiring AI Engineer & SaaS Builder`,
    template: `%s | ${personalInfo.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: personalInfo.name, url: siteConfig.url }],
  creator: personalInfo.name,
  publisher: personalInfo.name,

  // ─── Canonical & Alternates ─────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ─── Open Graph ─────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: personalInfo.name,
    title: `${personalInfo.name} — Aspiring AI Engineer & SaaS Builder`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} — Portfolio`,
        type: "image/png",
      },
    ],
  },

  // ─── Twitter / X ────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — Aspiring AI Engineer & SaaS Builder`,
    description: siteConfig.description,
    creator: "@radibyp",
    images: ["/opengraph-image"],
  },

  // ─── Icons ──────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },

  // ─── Robots ─────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Verification (add your IDs when you have them) ─────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_ID",
  // },

  // ─── Other ──────────────────────────────────────────────
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ─── JSON-LD Structured Data ──────────────────────────────
function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    url: siteConfig.url,
    email: `mailto:${personalInfo.email}`,
    image: `${siteConfig.url}${personalInfo.profileImage}`,
    jobTitle: "Aspiring AI Engineer",
    description: siteConfig.description,
    sameAs: [
      personalInfo.socials.github,
      personalInfo.socials.linkedin,
      personalInfo.socials.x,
      personalInfo.socials.leetcode,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "SaaS Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Node.js",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "SMK Nusantara 1",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: personalInfo.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: personalInfo.name,
      url: siteConfig.url,
      image: `${siteConfig.url}${personalInfo.profileImage}`,
    },
    dateCreated: "2024-01-01T00:00:00+07:00",
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <ThemeTransitionProvider>
            {children}
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
