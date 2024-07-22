"use client";

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
        <main>
            <Protect
                permission="org:sys_memberships:manage"
                fallback={
                    <p>
                        Your account is not an administrator and does not have
                        permissions to view or manage users.
                    </p>
                }
            >
                <Organizations />
                <OrganizationMembersTable />
            </Protect>
        </main>
    );
}
