import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeTransitionProvider } from "@/components/theme-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raditya Alia Pratama | Student",
  description:
    "Vocational student interested in building SaaS products with AI.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
