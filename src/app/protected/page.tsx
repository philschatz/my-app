"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import ExampleCompoenent from "./ExampleComponent";

export default function ProtectedHome() {
    return (
            <ExampleCompoenent
                useUser={useUser}
            />
    );
}
