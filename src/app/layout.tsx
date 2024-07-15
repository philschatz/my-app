import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import "./globals.css";

import styles from "./layout.module.css";

// const inter = Inter({ subsets: ["latin"] });

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
        <ClerkProvider>
            <html lang="en">
                <body>
                    {/* <body className={inter.className}> */}
                    <div className={styles.loginLogout}>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
