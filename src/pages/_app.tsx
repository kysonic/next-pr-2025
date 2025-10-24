import type { AppProps } from 'next/app';
import { useEffect, type ReactElement, type ReactNode } from 'react';
import type { NextPage } from 'next';
import MainLayout from '@/components/layouts/MainLayout';
import { authStore } from '@/stores/auth';
// Mobx config
import '@/stores/index';

import '@/styles/globals.css';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Always run me on start to check auth state so how we use protected HTTP Only Cookie
    useEffect(() => {
        if (!authStore.user) {
            authStore.me();
        }
    }, []);

    // Use the layout defined at the page level, if available
    const getLayout =
        Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

    return getLayout(<Component {...pageProps} />);
}
