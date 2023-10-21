import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const blogHomepageData = {
    title: "Multilanguage Blog Application",
  };

  // Font
  const interSemiBold = fetch(
    new URL("./../fonts/Inter-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          backgroundImage:
            "url(https://cruip-tutorials-next.vercel.app/social-card-bg.jpg)",
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        MultiLang Blog
        <img
          width="203"
          height="44"
          src={`https://cruip-tutorials-next.vercel.app/author.png`}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
