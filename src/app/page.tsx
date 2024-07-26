import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LoginOrSignup } from "@/components/login-or-signup";
import Link from "next/link";
import { Flex } from "@mantine/core";
import { container } from "./styles.css";

export default function Home() {
    return (
        <main className={container}>
            <SignedOut>
                <LoginOrSignup />
            </SignedOut>
            <SignedIn>
                <Flex mt="xl" c="blue" justify={"center"}>
                    <Link href="/dashboard">View your dashboard</Link>
                </Flex>
            </SignedIn>
        </main>
    );
}
