import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { Providers } from '@/components/providers'
import { AppLayout } from "@/components/app-layout";

export const metadata: Metadata = {
    title: "SafeInsights Demo App",
    description: "A test application to demonstrate basic IAM functionality",
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
