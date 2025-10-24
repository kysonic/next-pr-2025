import type { NextConfig } from 'next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: 'picsum.photos',
            },
        ],
    },
};

export default withFlowbiteReact(nextConfig);
