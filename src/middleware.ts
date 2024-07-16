import { clerkMiddleware } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { NextRequest, NextResponse } from "next/server";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

// export default clerkMiddleware();

export default clerkMiddleware(async (auth, request: NextRequest) => {
    const { userId, orgId, orgRole } = auth();
    const pathname = request.nextUrl.pathname;
    if (userId) {
        console.log(userId);
        const user = await clerkClient.users.getUser(userId);
        if (!user.twoFactorEnabled) {
            console.log("bad user! enable mfa!");
            return NextResponse.redirect(
                new URL("/accounts/manage-mfa/add", request.url),
            );
        }
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
