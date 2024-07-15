import styles from "./page.module.css";
import { UserInfo } from "../components/user";
import { UserToken } from "@/components/token";
import { Protect } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className={styles.main}>
        <UserInfo />
        <Protect><UserToken /></Protect>
    </main>
  );
}
