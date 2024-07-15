// page.stylex.ts
import * as stylex from "@stylexjs/stylex";
import { tokens } from "./tokens.stylex";

const DARK = "@media (prefers-color-scheme: dark)";
const MOBILE = "@media (max-width: 600px)";
const HOVER = "@media (hover: hover) and (pointer: fine)";

// Page-specific variables
export const vars = stylex.defineVars({
    grayRgb: { default: "0, 0, 0", [DARK]: "255, 255, 255" },
    grayAlpha200: {
        default: "rgba(var(--grayRgb), 0.08)",
        [DARK]: "rgba(var(--grayRgb), 0.145)",
    },
    grayAlpha100: {
        default: "rgba(var(--grayRgb), 0.05)",
        [DARK]: "rgba(var(--grayRgb), 0.06)",
    },
    buttonPrimaryHover: { default: "#383838", [DARK]: "#ccc" },
    buttonSecondaryHover: { default: "#f2f2f2", [DARK]: "#1a1a1a" },
});

export const styles = stylex.create({
    page: {
        display: "grid",
        gridTemplateRows: "20px 1fr 20px",
        alignItems: "center",
        justifyItems: "center",
        minHeight: "100svh",
        padding: {
            default: tokens.spacing6x,
            [MOBILE]: tokens.spacing2x,
        },
        paddingBottom: {
            [MOBILE]: tokens.spacing5x,
        },
        gap: tokens.spacing4x,
        fontSynthesis: "none",
    },
    main: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacing2x,
        gridRowStart: "2",
        alignItems: {
            [MOBILE]: "center",
        },
    },
    ol: {
        fontFamily: tokens.fontFamilyMono,
        paddingLeft: tokens.spacingNone,
        margin: tokens.spacingNone,
        fontSize: tokens.fontSizeSmall,
        lineHeight: tokens.lineHeightBase,
        letterSpacing: tokens.letterSpacingTight,
        listStylePosition: "inside",
        textAlign: {
            [MOBILE]: "center",
        },
    },
    li: {
        marginBottom: tokens.spacingHalf,
        ":last-of-type": {
            marginBottom: tokens.spacingNone,
        },
    },
    code: {
        fontFamily: "inherit",
        background: vars.grayAlpha100,
        padding: `${tokens.spacingQuarter} ${tokens.spacingHalf}`,
        borderRadius: tokens.borderRadiusSmall,
        fontWeight: tokens.fontWeightSemibold,
    },
    ctas: {
        display: "flex",
        gap: tokens.spacingBase,
        flexDirection: {
            [MOBILE]: "column",
        },
    },
    link: {
        appearance: "none",
        borderRadius: tokens.borderRadiusRound,
        height: {
            default: tokens.spacing3x,
            [MOBILE]: tokens.spacing2x,
        },
        padding: {
            default: `0 ${tokens.spacingBase}`,
            [MOBILE]: `0 ${tokens.spacingBase}`,
        },
        border: "none",
        fontFamily: tokens.fontFamilySans,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: {
            default: tokens.fontSizeBase,
            [MOBILE]: tokens.fontSizeSmall,
        },
        lineHeight: tokens.lineHeightTight,
        fontWeight: tokens.fontWeightMedium,
    },
    primaryLink: {
        background: tokens.colorForeground,
        color: tokens.colorBackground,
        gap: tokens.spacingHalf,
        [HOVER]: {
            background: vars.buttonPrimaryHover,
            borderColor: "transparent",
        },
    },
    secondaryLink: {
        borderColor: vars.grayAlpha200,
        minWidth: {
            default: "180px",
            [MOBILE]: "auto",
        },
        [HOVER]: {
            background: vars.buttonSecondaryHover,
            borderColor: "transparent",
        },
    },
    footer: {
        fontFamily: tokens.fontFamilySans,
        gridRowStart: "3",
        display: "flex",
        gap: tokens.spacing1_5x,
        flexWrap: {
            [MOBILE]: "wrap",
        },
        alignItems: {
            [MOBILE]: "center",
        },
        justifyContent: {
            [MOBILE]: "center",
        },
    },
    footerLink: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHalf,
        [HOVER]: {
            textDecoration: "underline",
            textUnderlineOffset: "4px",
        },
    },
    footerImg: {
        flexShrink: "0",
    },
    logo: {
        [DARK]: {
            filter: "invert()",
        },
    },
});
