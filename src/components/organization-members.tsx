import { useEffect, useState } from "react";
import { Table } from '@mantine/core';
import { useOrganization } from "@clerk/nextjs";
import { Protect, useClerk } from "@clerk/nextjs"
import { IconTrashXFilled } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

// ugg, this is a mess why can't clerk export the type
type Organization = NonNullable<
    ReturnType<
        typeof useOrganization
    >
>['organization']

type Membership = Awaited<
    ReturnType<
        NonNullable<
            NonNullable<
                ReturnType<
                    typeof useOrganization
                >
            >['organization']
        >['getMemberships']
    >
>['data'][number]


function useOrganizationMembers(): { members: Membership[], organization: Organization } {
    const { organization } = useOrganization()
    const [members, setMembers] = useState<Membership[]>([])


    useEffect(() => {
        if (!organization) {
            return;
        }
        organization.getMemberships().then((memberships) => {
            setMembers(memberships.data)
        });
    }, [organization])

    return { members, organization }
}


export const OrganizationMembersTable = () => {

    const { members } = useOrganizationMembers()

    if (!members.length) {
      return null;
    }

    const onDelete = async (member?: Membership) => {
        if (!member) {
            return;
        }
        const userName = `${member.publicUserData.firstName} ${member.publicUserData.lastName}`
        try {
            await member.destroy()
            notifications.show({
                title: 'Removed user',
                message:  ` ${userName} was successfully removed`,
            })
        } catch (error) {
            notifications.show({
                title: `Error: ${error}`,
                message: `Failed to remove user: ${userName}`,
                color: 'red',
            })
        }

    }
    const rows = members.map((member) => (
        <Table.Tr key={member.id}>
            <Table.Td>{member.id}</Table.Td>
            <Table.Td>{member.publicUserData.firstName}</Table.Td>
            <Table.Td>{member.publicUserData.lastName}</Table.Td>
            <Table.Td>
                <Protect permission="org:sys_memberships:manage">
                    <IconTrashXFilled onClick={() => onDelete(member)} cursor="pointer" />
                </Protect>
            </Table.Td>
        </Table.Tr>
    ));


    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>First Name</Table.Th>
                    <Table.Th>Last Name</Table.Th>
                    <Table.Th>
                        <Protect permission="org:sys_memberships:manage">
                            Delete
                        </Protect>
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
};
