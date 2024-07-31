import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";
import { useUserPage } from "./helpers";

// TODO We can just set CLERK_TESTING_TOKEN env variable instead
test.describe("app", () => {
    test("unauthenticated user", async ({ page }) => {
        await setupClerkTestingToken({ page });

        await page.goto("/admin");

        await expect(page).not.toHaveURL("/admin");
        await expect(page).toHaveURL("/");
        // await page.locator('input[name=identifier]').fill(process.env.E2E_CLERK_USER_USERNAME!);
        // await page.getByRole('button', { name: 'Continue', exact: true }).click();
        // await page.locator('input[name=password]').fill(process.env.E2E_CLERK_USER_PASSWORD!);
        // await page.getByRole('button', { name: 'Continue', exact: true }).click();
        // await page.waitForURL('**/protected');
    });

    test("protected page", async ({ browser }) => {
        const unauthenticatedPage = await browser.newPage();
        await unauthenticatedPage.goto("/protected");
        await unauthenticatedPage
            .getByText("You need to be signed in to see the protected page.")
            .isVisible();
        const userPage = await useUserPage(browser);
        await userPage.goto("/protected");
        await unauthenticatedPage
            .getByText(
                "This is a protected page that only signed in users can see.",
            )
            .isVisible();
        await userPage.waitForTimeout(5000);
    });
});
