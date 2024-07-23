import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";
import {useUserPage} from "./helpers";

// TODO We can just set CLERK_TESTING_TOKEN env variable instead
test.describe('app', () => {
    test("unauthenticated user", async ({ page }) => {
        await setupClerkTestingToken({ page });

        await page.goto("/admin");
        await expect(page).not.toHaveURL('/admin')
        await expect(page).toHaveURL('/')
    });

    // TODO Why isn't the manage-mfa redirect not triggering
    test("requires MFA", async ({browser}) => {
        const userPage = await useUserPage(browser)
        await userPage.goto('/manage-mfa')
        await userPage.waitForURL('/manage-mfa')
        await expect(userPage.getByText('Setup TOTP MFA')).toBeVisible();
    })
});
