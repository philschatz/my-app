import { Browser } from "playwright-core";
import { setupClerkTestingToken } from "@clerk/testing/playwright";

export const adminAuthFile = "playwright/.auth/admin.json";
export const userAuthFile = "playwright/.auth/user.json";

export const useAdminPage = async (browser: Browser) => {
    const adminContext = await browser.newContext({
        storageState: adminAuthFile,
    });
    const adminPage = await adminContext.newPage();
    await setupClerkTestingToken({ page: adminPage });
    return adminPage;
};

export const useUserPage = async (browser: Browser) => {
    const userContext = await browser.newContext({
        storageState: userAuthFile,
    });
    const userPage = await userContext.newPage();
    await setupClerkTestingToken({ page: userPage });
    await userPage.waitForLoadState("networkidle");
    return userPage;
};
