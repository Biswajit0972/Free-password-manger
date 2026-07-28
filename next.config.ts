import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            // Google profile images
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "t1.gstatic.com",
            },

            // GitHub avatars
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },

            // Facebook profile images
            {
                protocol: "https",
                hostname: "platform-lookaside.fbsbx.com",
            },

            // LinkedIn profile images
            {
                protocol: "https",
                hostname: "media.licdn.com",
            },

            // X (Twitter) profile images
            {
                protocol: "https",
                hostname: "pbs.twimg.com",
            },

            {
                protocol: "https",
                hostname: "t1.gstatic.com",
            },
        ],
    },

    reactStrictMode: true,

    experimental: {
        optimizePackageImports: [
            "@clerk/nextjs",
            "@radix-ui/react-icons",
        ],
    },
};

export default nextConfig;