import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Dashboard } from '@/components/dashboard'

export default function Home() {
    return (
        <main>
            <SignedOut>
                <h1>you must be signed in to access the dashboard</h1>
            </SignedOut>
            <SignedIn>
                <Dashboard />
            </SignedIn>
        </main>
    );
}
