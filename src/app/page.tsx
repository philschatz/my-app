import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Text } from "@mantine/core";
import { LoginOrSignup } from "@/components/login-or-signup";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";

// this is mainly a test of stylex, it could also be accomplished with mantine props
const styles = stylex.create({
    dashboardLink: {
        color: "blue",
        marginTop: "2rem",
        textDecoration: "underline",
        display: "flex",
        justifyContent: "center",
    },
});

export default function Home() {
    return (
        <main>
            <SignedOut>
                <LoginOrSignup />
            </SignedOut>
            <SignedIn>
                <div {...stylex.props(styles.dashboardLink)}>
                    <Link href="/dashboard">View your dashboard</Link>
                </div>
            </SignedIn>
        </main>
    );
}
