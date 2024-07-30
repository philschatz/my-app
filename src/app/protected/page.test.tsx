import { expect, vi, describe, it, afterEach } from "vitest";
import { render } from "@testing-library/react";
import Page from "./page";

import * as ClerkNextJS from "@clerk/nextjs";
import * as NextNavigation from "next/navigation";
vi.mock("@clerk/nextjs");
vi.mock("next/navigation");

describe("Protected Page", () => {
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
});
