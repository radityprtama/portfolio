import { NextResponse } from "next/server";

// In-memory store for development/fallback
// Note: This resets when the server restarts or in serverless environments
let memoryCount = 1240; 

export async function GET() {
  // TODO: When @vercel/kv is installed and configured:
  // 1. npm install @vercel/kv
  // 2. Uncomment the following lines:
  // import { kv } from "@vercel/kv";
  // const count = await kv.get("visitor_count");
  // return NextResponse.json({ count: count || 0 });

  return NextResponse.json({ count: memoryCount });
}

export async function POST() {
  // TODO: When @vercel/kv is installed and configured:
  // 1. Uncomment the following lines:
  // import { kv } from "@vercel/kv";
  // const count = await kv.incr("visitor_count");
  // return NextResponse.json({ count });

  memoryCount++;
  return NextResponse.json({ count: memoryCount });
}
