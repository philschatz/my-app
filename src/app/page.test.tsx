import {expect, jest, test} from '@jest/globals';
import { render, screen, within } from "@testing-library/react";
import { Providers as P } from "@/components/providers"
import Home from "./page";
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

jest.mock('next/router', () => require('next-router-mock'));


test("Pages Router", () => {
    render(<P><Home /></P>, {
        wrapper: MemoryRouterProvider,
    });
    const main = within(screen.getByRole("main"));
    expect(
        main.getByRole("heading", { level: 1, name: /welcome to next\.js!/i }),
    ).toBeDefined();

    const footer = within(screen.getByRole("contentinfo"));
    const link = within(footer.getByRole("link"));
    expect(link.getByRole("img", { name: /vercel logo/i })).toBeDefined();
});
