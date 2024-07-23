"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import ExampleCompoenent from "./ExampleComponent";
import AppContext from "@/AppContext";

export default function ProtectedHome() {
    return (
        <AppContext.Provider value={{ SignedIn, SignedOut }}>
            <ExampleCompoenent
                useUser={useUser}
            />
        </AppContext.Provider>
    );
}
