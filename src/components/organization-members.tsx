import { useEffect, useState } from "react";
import { Table } from '@mantine/core';
import { useOrganization } from "@clerk/nextjs";


// ugg, this is a mess why can't clerk export the type
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


function useOrganizationMembers(): Membership[] {
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

    return members
}


export const OrganizationMembersTable = () => {

    const members = useOrganizationMembers()

    if (!members.length) {
      return null;
    }

    const rows = members.map((member) => (
        <Table.Tr key={member.id}>
            <Table.Td>{member.id}</Table.Td>
            <Table.Td>{member.publicUserData.firstName}</Table.Td>
        </Table.Tr>
    ));

  return (
    <Table>
          <Table.Thead>
              <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Name</Table.Th>
              </Table.Tr>
              <Table.Tbody>{rows}</Table.Tbody>
          </Table.Thead>
    </Table>
  );
};
