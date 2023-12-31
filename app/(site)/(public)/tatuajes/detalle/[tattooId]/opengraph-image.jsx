import { TattooService } from "@/services/db/TattooService";
import { ImageResponse } from "next/server";

// TODO: Open graph for tattoos
// Route segment config
// export const runtime = 'edge'

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }) {
  const tattoo = await TattooService.getById(params.tattooId);
  // Font
  // const interSemiBold = fetch(
  //     new URL('./Inter-SemiBold.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        About Acme
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      // fonts: [
      //     {
      //         name: 'Inter',
      //         data: interSemiBold,
      //         style: 'normal',
      //         weight: 400,
      //     },
      // ],
    },
  );
}
