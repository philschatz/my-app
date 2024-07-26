import { expect, vi, describe, it, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Page from "./page";

import { MantineProvider } from "@mantine/core";
vi.mock("@clerk/nextjs", () => ({
    useUser: vi.fn(),
    SignedOut: vi.fn(),
    SignedIn: (props: object) => <div title="SignedIn" {...props} />,
}));

describe("Protected Page", () => {
    it("redirects when not signed in", () => {
        render(
            <MantineProvider>
                <Page />
            </MantineProvider>,
        );
        const link = within(screen.getByRole("link"));
        expect(link).toBeDefined();
    });
});
