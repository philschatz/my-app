import { clerkSetup } from "@clerk/testing/playwright";
import { test as setup } from "@playwright/test";

setup("global setup", async ({}) => {
    await clerkSetup();

    // TODO we can probably just keep the username.password in source code if they are purely local, for now they can be set in GH actions
    // if (!process.env.E2E_CLERK_USER_USERNAME || !process.env.E2E_CLERK_USER_PASSWORD) {
    //     throw new Error(
    //         'Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables.'
    //     );
    // }
});
