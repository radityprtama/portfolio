import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raditya Alia Pratama | Student",
  description: "Vocational student interested in building SaaS products with AI.",
  icons: {
    icon: "/favicon-portfolio.png",
    apple: "/favicon-portfolio.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
