import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { Providers } from '@/components/providers'
import { AppLayout } from "@/components/app-layout";

export const metadata: Metadata = {
    title: "Clerk Spike",
    description: "A code spike to test Clerk functionality",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <AppLayout>
                        {children}
                    </AppLayout>
                </Providers>
            </body>
        </html >
    );
}
