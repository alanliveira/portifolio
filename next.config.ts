import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // The Turnstile site key is intentionally exposed to render the browser widget.
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY ?? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
