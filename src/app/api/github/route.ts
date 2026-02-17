import { NextResponse } from "next/server";

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

// Disable caching to always get fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: "radityprtama" },
      }),
      cache: "no-store", // Disable fetch caching
    });

    const data = await res.json();

    if (data.errors) {
      return NextResponse.json({ error: data.errors }, { status: 500 });
    }

    const calendar =
      data.data.user.contributionsCollection.contributionCalendar;

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }
}
