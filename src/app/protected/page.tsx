"use client";
import styles from "../page.module.css";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function ProtectedHome() {
    const { isSignedIn, isLoaded } = useUser();
    if (isLoaded && !isSignedIn) {
        redirect("/");
    }
    return (
        <main className={styles.main}>
            <SignedOut>
                You need to be signed in to see the protected page. Redirecting
                you to the homepage
            </SignedOut>
            <SignedIn>
                This is a protected page that only signed in users can see.
            </SignedIn>
        </main>
    );
}
