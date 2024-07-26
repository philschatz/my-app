import { expect, vi, describe, it, afterEach } from "vitest";
import { render } from "@testing-library/react";
import Page from "./page";

import * as ClerkNextJS from "@clerk/nextjs";
import * as NextNavigation from "next/navigation";
import { MantineProvider } from "@mantine/core";
vi.mock("@clerk/nextjs");
vi.mock("next/navigation");

describe("Admin Page", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });
    const spyRedirect = vi.spyOn(NextNavigation, "redirect");
    const spyUseUser = vi.spyOn(ClerkNextJS, "useUser");

    it("redirects when not signed in", () => {
        spyUseUser.mockReturnValue({
            isLoaded: true,
            isSignedIn: false,
            user: null,
        });
        render(<Page />);
        expect(spyRedirect).toHaveBeenCalled();
    });

    it("does not redirect when signed in", () => {
        spyUseUser.mockReturnValue({
            isLoaded: true,
            isSignedIn: true,
            user: null as never,
        });
        render(<Page />);
        expect(spyRedirect).not.toHaveBeenCalled();
    });

    it("shows a loading page", () => {
        spyUseUser.mockReturnValue({
            isLoaded: false,
            isSignedIn: undefined,
            user: null as never,
        });
        render(
            <MantineProvider>
                <Page />
            </MantineProvider>,
        );
        expect(spyRedirect).not.toHaveBeenCalled();
    });
});
