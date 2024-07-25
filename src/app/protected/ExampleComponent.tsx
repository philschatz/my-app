"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";
import { redirect } from "next/navigation";

// copied from Clerk because they don't export this type
type UseUserReturn =
    | {
          isLoaded: false;
          isSignedIn: undefined;
          user: undefined;
      }
    | {
          isLoaded: true;
          isSignedIn: false;
          user: null;
      }
    | {
          isLoaded: true;
          isSignedIn: true;
          user: UserResource;
      };

type Props = {
    useUser: () => UseUserReturn;
};

export default function Hoisted({ useUser }: Props) {
    const { isSignedIn, isLoaded } = useUser();
    if (isLoaded && !isSignedIn) {
        redirect("/");
    }
    return (
        <main>
            <SignedOut>
                You need to be signed in to see the protected page. Redirecting
                you to the homepage
            </SignedOut>
            <SignedIn>
                This is a protected page that only signed in users can see. And
                you are signed in!
            </SignedIn>
        </main>
    );
}
