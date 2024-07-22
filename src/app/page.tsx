import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Text } from '@mantine/core'
import { LoginOrSignup } from '@/components/login-or-signup';
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <SignedOut>
                <LoginOrSignup />
            </SignedOut>
            <SignedIn>
                <Text><Link href="/dashboard">View your dashboard</Link></Text>
            </SignedIn>
        </main>
    );
}
