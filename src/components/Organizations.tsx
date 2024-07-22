"use client";

import { Avatar, Flex, Skeleton, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Protect, useOrganizationList, useUser } from "@clerk/nextjs";
import { IconTrashXFilled } from "@tabler/icons-react";
import { OrganizationResource } from "@clerk/types";
import { notifications } from "@mantine/notifications";
import DebouncedInput from "./DebouncedInput";

async function withConfirm(onConfirm: () => any) {
    modals.openConfirmModal({
        title: "Confirmation Dialog",
        children: <Text>Are you sure?</Text>,
        labels: { confirm: "Confirm", cancel: "Cancel" },
        onConfirm,
    });
}

async function onRenameOrg(org: OrganizationResource, newName: string) {
    try {
        const oldName = org.name;
        await org.update({ name: newName });
        notifications.show({
            title: "Renamed organization",
            message: ` ${oldName} was successfully renamed to ${newName}`,
        });
    } catch (error) {
        notifications.show({
            title: `Error: ${error}`,
            message: `Failed to rename organization: ${org.name}`,
            color: "red",
        });
    }
}

async function onDeleteOrg(org: OrganizationResource) {
    try {
        // await org.destroy();
        notifications.show({
            title: "Removed organization",
            message: ` ${org.name} was successfully removed`,
        });
    } catch (error) {
        notifications.show({
            title: `Error: ${error}`,
            message: `Failed to remove organization: ${org.name}`,
            color: "red",
        });
    }
}

export default function Organizations() {
    const orgs = useOrganizationList({
        userMemberships: true,
        userInvitations: true,
        userSuggestions: true,
    });

    if (!orgs.isLoaded) {
        return <Skeleton height={80} radius="xl" />;
    }

    return (
        <Flex direction="column">
            <Table captionSide="top">
                <Table.Caption>Organizations</Table.Caption>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Protect permission="org:sys_memberships:manage">
                            <Table.Th>Save</Table.Th>
                            <Table.Th>Delete</Table.Th>
                        </Protect>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {orgs.userMemberships.data?.map((org) => (
                        <Table.Tr key={org.id}>
                            <Table.Td>
                                <Avatar src={org.organization.imageUrl} />
                            </Table.Td>
                            <Table.Td>
                                <DebouncedInput
                                    placeholder="Org name"
                                    value={org.organization.name}
                                    onValueChanged={(newValue: string) =>
                                        onRenameOrg(org.organization, newValue)
                                    }
                                />
                            </Table.Td>
                            <Table.Td>
                                <IconTrashXFilled
                                    onClick={() =>
                                        withConfirm(() =>
                                            onDeleteOrg(org.organization),
                                        )
                                    }
                                    cursor="pointer"
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Flex>
    );
}
