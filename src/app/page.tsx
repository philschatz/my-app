import stylex from "@stylexjs/stylex";
import Image from "next/image";
import styles from "./page.module.css";

import { ReactNode } from "react";
import { StyleXArray } from "@stylexjs/stylex/lib/StyleXTypes";

const myStyles = stylex.create({
    card: {
        margin: "32px",
        padding: "16px",
        border: "1px spolid transparent",
        borderRadius: "8px",
        backgroundColor: "gray",
    },
});

type Props = Readonly<{
    featuredBg?: StyleXArray<any>;
    children: ReactNode;
}>;
export default function Home() {
    return (
        <div className={styles.page} {...stylex.props(myStyles.card)}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ol>
                    <li>
                        Get started by editing <code>src/app/page.tsx</code>
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>

                <div className={styles.ctas}>
                    <a
                        className={styles.primary}
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={styles.logo}
                            src="/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        Deploy now
                    </a>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        Read our docs
                    </a>
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by Vercel{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/globe.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
}
