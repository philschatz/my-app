import styles from "./page.module.css";
import { UserInfo } from "../components/user";
import { UserToken } from "@/components/token";
import { Protect, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
    return (
        <main className={styles.main}>
            <UserInfo />
            <Protect>
                <UserToken />
            </Protect>
            This is the homepage.
            <ul>
                <Link href="./protected">Link to a protected page</Link>
            </ul>
            <ul>
                <Link href="./admin">Link to an admin page</Link>
            </ul>
        </main>
    );
}
