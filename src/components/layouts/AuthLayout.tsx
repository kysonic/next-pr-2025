interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AuthLayout({ children }: LayoutProps) {
    return (
        <div className="auth-layout flex justify-center items-center min-h-screen">
            <main className="main">{children}</main>
        </div>
    );
}
