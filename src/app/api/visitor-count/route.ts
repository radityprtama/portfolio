import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// In-memory fallback for development (when KV env vars are not set)
let memoryCount = 1240;

function getRedis(): Redis | null {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

export async function GET() {
  try {
    const redis = getRedis();
    if (redis) {
      const count = (await redis.get<number>("visitor_count")) ?? 0;
      return NextResponse.json({ count });
    }
    return NextResponse.json({ count: memoryCount });
  } catch (error) {
    console.error("Visitor count GET error:", error);
    return NextResponse.json({ count: memoryCount });
  }
}

export async function POST() {
  try {
    const redis = getRedis();
    if (redis) {
      const count = await redis.incr("visitor_count");
      return NextResponse.json({ count });
    }
    memoryCount++;
    return NextResponse.json({ count: memoryCount });
  } catch (error) {
    console.error("Visitor count POST error:", error);
    memoryCount++;
    return NextResponse.json({ count: memoryCount });
  }
}
