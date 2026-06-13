import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "KITAMEN — Boutique Esports Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/logo/logo-dark.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          padding: "80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={720} height={103} />
        <div
          style={{
            marginTop: 48,
            fontSize: 40,
            color: "#e4e4e7",
            letterSpacing: "0.02em",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 26,
            color: "#71717a",
          }}
        >
          Crafted for impact. Delivered with precision.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            fontSize: 24,
            color: "#52525b",
          }}
        >
          home.kitamen.my
        </div>
      </div>
    ),
    { ...size },
  );
}
