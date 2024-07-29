import { expect, vi, test } from "vitest";
import { MantineProvider } from "@mantine/core";
import { render, screen, within } from "@testing-library/react";
import DebouncedInput from "./DebouncedInput";
import { theme } from "./theme";

test("Pages Router", () => {
    render(
        <MantineProvider theme={theme}>
            <DebouncedInput
                value="initial_value"
                onValueChanged={async (e) => {}}
            />
        </MantineProvider>,
    );
    const input = within(screen.getByRole("textbox"));
    expect(input).toBeDefined();
});
