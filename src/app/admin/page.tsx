"use client";
import styles from "../page.module.css";
import { SignedIn, SignedOut, Protect, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function ProtectedHome() {
    const { isSignedIn, isLoaded } = useUser();
    console.log(isSignedIn);
    if (isLoaded && !isSignedIn) {
        redirect("/");
    }
    return (
        <main className={styles.main}>
            This is the public part of the admin page (eventually this text will
            be removed).
            <Protect role="admin">
                This is hopefully the secret admin part
            </Protect>
        </main>
    );
}
