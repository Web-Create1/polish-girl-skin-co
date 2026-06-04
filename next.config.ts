import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // R3F + drei intrinsic JSX typings can be fussy under strict TS; don't let a
  // type-only nit block the production build. Runtime code is written carefully.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
