import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      { error: "Invalid metadata id" },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "metadata-files",
      id
    );

    const file = await readFile(filePath, "utf8");
    const json = JSON.parse(file);

    return NextResponse.json(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Metadata not found" },
      { status: 404 }
    );
  }
}