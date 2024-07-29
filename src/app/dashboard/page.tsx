import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Dashboard } from "@/components/dashboard";
import { AccessDeniedAlert } from "@/components/errors";

export default function Home() {
    return (
        <main>
            <SignedOut>
                <AccessDeniedAlert />
            </SignedOut>
            <SignedIn>
                <Dashboard />
            </SignedIn>
        </main>
    );
}
