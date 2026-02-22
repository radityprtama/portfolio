import { ImageResponse } from "next/og";
import { personalInfo } from "@/config/personal";

export const runtime = "nodejs";

export const alt = `${personalInfo.name} — Aspiring AI Engineer & SaaS Builder`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
            display: "flex",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          {personalInfo.name}
        </div>

        {/* Title / Role */}
        <div
          style={{
            fontSize: 32,
            color: "#a1a1aa",
            marginTop: 16,
            display: "flex",
          }}
        >
          Aspiring AI Engineer & SaaS Builder
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#71717a",
            marginTop: 32,
            maxWidth: "800px",
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          Building products with AI — Full-stack developer, open-source contributor
        </div>

        {/* Domain badge */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 24,
            color: "#6366f1",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
            }}
          />
          pratama.dev
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
