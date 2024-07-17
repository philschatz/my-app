'use client'

import styles from "../page.module.css";
import { Skeleton } from '@mantine/core'
import { Protect, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OrganizationMembersTable } from "@/components/organization-members";



export default function ProtectedHome() {
    const { isSignedIn, isLoaded } = useUser();
    console.log(isSignedIn);

    if (isLoaded && !isSignedIn) {
        redirect("/");
    }

    if (!isLoaded) {
        return  <Skeleton height={80} radius="xl" />
    }


    return (
        <main className={styles.main}>
            This is the public part of the admin page (eventually this text will
            be removed).
            <Protect
                permission="org:sys_memberships:read"
                fallback={<p>You do not have the permissions to view or manage users.</p>}
            >
                <OrganizationMembersTable />
            </Protect>
        </main>
    );
}
