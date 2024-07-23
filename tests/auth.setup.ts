import {test as setup} from '@playwright/test';

const adminFile = 'playwright/.auth/admin.json';


// TODO set up these users in clerk or automate test to create them (email verification might be hard with playwright?)
setup('authenticate as admin', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('your@email.com').first().fill('admin@test.com')
    await page.getByPlaceholder('password').first().fill('test123')
    await page.getByRole('button', { name: 'Login' }).click();

    await page.context().storageState({ path: adminFile });
});

const userFile = 'playwright/.auth/user.json';

setup('authenticate as user', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('your@email.com').first().fill('user@test.com')
    await page.getByPlaceholder('password').first().fill('test123')
    await page.getByRole('button', { name: 'Login' }).click();

    await page.context().storageState({ path: userFile });
});

