import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt requis" }, { status: 400 });
    }

    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt,
        image_size: "square_hd",
        num_images: 1,
      },
    });

    return NextResponse.json({ images: result.data.images });
  } catch (error) {
    console.error("Fal.ai error:", error);
    return NextResponse.json({ error: "Erreur de génération" }, { status: 500 });
  }
}
