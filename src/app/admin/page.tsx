"use client";

import { Skeleton } from "@mantine/core";
import { Protect, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OrganizationMembersTable } from "@/components/organization-members";

export default function ProtectedHome() {
    const { isSignedIn, isLoaded } = useUser();

    if (isLoaded && !isSignedIn) {
        redirect("/");
    }

    if (!isLoaded) {
        return <Skeleton height={80} radius="xl" />;
    }

    return (
        <main>
            This is the public part of the admin page (eventually this text will
            be removed).
            <Protect
                permission="org:sys_memberships:manage"
                fallback={
                    <p>
                        You do not have the permissions to view or manage users.
                    </p>
                }
            >
                <OrganizationMembersTable />
            </Protect>
        </main>
    );
}
