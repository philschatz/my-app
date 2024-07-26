import { expect, vi, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { NavAuthMenu } from "./nav-auth-menu";

vi.mock("@mantine/core", () => {
    return {
        MantineProvider: (info: object) => (
            <div id="mock-mantine-provider" {...info} />
        ),
        Group: (info: object) => <div id="mock-mantine-group" {...info} />,
    };
});

vi.mock("@clerk/nextjs", () => {
    return {
        SignInButton: () => <button id="mock-signin-button" />,
        SignedIn: (info: object) => <div id="mock-signed-in" {...info} />,
        SignedOut: (info: object) => <div id="mock-signed-out" {...info} />,
        UserButton: () => <button id="mock-user-button" />,
        OrganizationSwitcher: () => <button id="mock-org-switcher" />,
    };
});

test("NavAuthMenu", () => {
    render(<NavAuthMenu />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toEqual(3);
});
