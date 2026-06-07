import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, modelId } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt requis" }, { status: 400 });
    }

    const model = modelId || "fal-ai/flux/dev";

    const result = await fal.subscribe(model, {
      input: {
        prompt,
        image_size: "square_hd",
        num_images: 1,
        num_inference_steps: 28,
      },
    });

    return NextResponse.json({ images: (result.data as { images: { url: string }[] }).images });
  } catch (error) {
    console.error("Fal.ai error:", error);
    return NextResponse.json({ error: "Erreur de génération. Vérifiez vos crédits fal.ai." }, { status: 500 });
  }
}
