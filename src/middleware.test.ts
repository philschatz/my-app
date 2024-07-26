import { expect, vi, test } from "vitest";

import { clerkMiddleware } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import middleware from "./middleware";

vi.mock("@clerk/nextjs/server", () => ({
    clerkMiddleware: () => console.log("clerkMiddleware-ran"),
}));

vi.mock("@clerk/backend", () => ({
    createClerkClient: () => console.log("createClerkClient-ran"),
}));

test("middleware", () => {
    const req = null as unknown as NextRequest;
    const event = null as unknown as NextFetchEvent;
    middleware(req, event);
});
