// tokens.stylex.ts
import * as stylex from "@stylexjs/stylex";

const DARK = "@media (prefers-color-scheme: dark)";

export const tokens = stylex.defineVars({
    // Colors
    colorBackground: { default: "#ffffff", [DARK]: "#0a0a0a" },
    colorForeground: { default: "#171717", [DARK]: "#ededed" },
    colorGrayRgb: { default: "0, 0, 0", [DARK]: "255, 255, 255" },
    colorGrayAlpha200: {
        default: "rgba(var(--colorGrayRgb), 0.08)",
        [DARK]: "rgba(var(--colorGrayRgb), 0.145)",
    },
    colorGrayAlpha100: {
        default: "rgba(var(--colorGrayRgb), 0.05)",
        [DARK]: "rgba(var(--colorGrayRgb), 0.06)",
    },
    colorButtonPrimaryHover: { default: "#383838", [DARK]: "#ccc" },
    colorButtonSecondaryHover: { default: "#f2f2f2", [DARK]: "#1a1a1a" },

    // Typography
    fontFamilySans: "var(--font-geist-sans)",
    fontFamilyMono: "var(--font-geist-mono)",
    fontSizeSmall: "14px",
    fontSizeBase: "16px",
    lineHeightTight: "20px",
    lineHeightBase: "24px",
    fontWeightNormal: "400",
    fontWeightMedium: "500",
    fontWeightSemibold: "600",
    letterSpacingTight: "-0.01em",

    // Spacing
    spacingNone: "0",
    spacingQuarter: "2px",
    spacingHalf: "4px",
    spacingBase: "8px",
    spacing1_5x: "12px",
    spacing2x: "16px",
    spacing3x: "24px",
    spacing4x: "32px",
    spacing5x: "40px",
    spacing6x: "48px",
    spacing8x: "64px",
    spacing12x: "96px",

    // Borders
    borderRadiusSmall: "4px",
    borderRadiusMedium: "8px",
    borderRadiusLarge: "16px",
    borderRadiusRound: "9999px",

    // Transitions
    transitionDurationFast: "0.1s",
    transitionDurationBase: "0.2s",
    transitionTimingBase: "ease-in-out",
});

// Global styles
export const globalStyles = stylex.create({
    root: {
        colorScheme: {
            default: "light",
            [DARK]: "dark",
        },
    },

    htmlBody: {
        maxWidth: "100vw",
        overflowX: "hidden",
    },

    body: {
        color: tokens.colorForeground,
        backgroundColor: tokens.colorBackground,
    },

    allElements: {
        boxSizing: "border-box",
        padding: tokens.spacingNone,
        margin: tokens.spacingNone,
    },

    anchor: {
        color: "inherit",
        textDecoration: "none",
    },
});

// Utility styles
export const utils = stylex.create({
    visuallyHidden: {
        position: "absolute",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        clip: "rect(1px, 1px, 1px, 1px)",
        whiteSpace: "nowrap",
    },
});
