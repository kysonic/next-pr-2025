import Head from 'next/head';
import MainHeader from './headers/MainHeader';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function Layout({
    children,
    title = 'Next Book Shop',
}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content="Next.js Page Router website"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="main-layout">
                <MainHeader />

                <main className="main">{children}</main>

                <footer className="footer px-10 py-5 mt-2">
                    <p>&copy; 2025 My Website. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
