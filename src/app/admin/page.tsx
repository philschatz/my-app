"use client";
import { useEffect } from "react";
import styles from "../page.module.css";
import { Skeleton } from '@mantine/core'
import { Protect, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OrganizationMembersTable } from "@/components/organization-members";



export default function ProtectedHome() {
    const { isSignedIn, isLoaded, user } = useUser();
    console.log(isSignedIn);

    if (isLoaded && !isSignedIn) {
        redirect("/");
    }

    useEffect(() => {
        if (user && user.organizationMemberships.length === 0) {
            //       return
        }

        user?.organizationMemberships[0].organization.getRoles().then((roles) => {

            console.log(roles);
        });

    }, [user?.organizationMemberships.length]);


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
