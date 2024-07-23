import {test} from "@playwright/test";
import {setupClerkTestingToken} from "@clerk/testing/playwright";

test("sign up", async ({ page }) => {
    await setupClerkTestingToken({ page });

    await page.goto('/signup');

    await page.getByPlaceholder('your@email.com').fill('testemail@test.com');
    await page.getByPlaceholder('password').fill('testpassword123');
    await page.getByText('I agree to the terms of service').click()

    // await page.getByRole('button', { name: 'Continue', exact: true }).click();
    // await page.waitForURL('**/protected');
});
