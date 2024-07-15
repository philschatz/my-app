"use client"
import { useUser } from "@clerk/clerk-react";

export function UserInfo() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (isSignedIn) {
    return <div>Hello {user.fullName || 'anonymous user'}!</div>;
  }

  return <div>Not signed in</div>;
}
