import { clerkMiddleware } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { NextRequest, NextResponse } from "next/server";

const clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

export default clerkMiddleware(async (auth, request: NextRequest) => {
    const { userId, orgId, orgRole } = auth();
    const pathname = request.nextUrl.pathname;
    if (userId && pathname != "/manage-mfa") {
        console.log(userId);
        try {
            const user = await clerk.users.getUser(userId); // cache this
            if (!user.twoFactorEnabled) {
                console.log("bad user! enable mfa!");
                return NextResponse.redirect(
                    new URL("/manage-mfa", request.url),
                );
            }
        } catch (error) {
            console.error("error fetching user:", error);
        }
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
