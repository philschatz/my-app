"use client";

import styles from "../page.module.css";
import { Skeleton } from "@mantine/core";
import { Protect, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OrganizationMembersTable } from "@/components/organization-members";
import Organizations from "@/components/Organizations";

export default function ProtectedHome() {
    const { isSignedIn, isLoaded } = useUser();

    if (isLoaded && !isSignedIn) {
        redirect("/");
    }

    if (!isLoaded) {
        return <Skeleton height={80} radius="xl" />;
    }

    return (
        <main className={styles.main}>
            <Protect
                permission="org:sys_memberships:manage"
                fallback={
                    <p>
                        You do not have the permissions to view or manage users.
                    </p>
                }
            >
                <Organizations />
                <OrganizationMembersTable />
            </Protect>
        </main>
    );
}
