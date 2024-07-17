import { useEffect, useState } from "react";
import { Avatar, Flex, Button, Table, TextInput } from "@mantine/core";
import { useForm, isEmail, isInRange, hasLength, matches } from "@mantine/form";
import { useOrganization } from "@clerk/nextjs";
import {
    OrganizationInvitationResource,
    OrganizationMembershipResource,
    OrganizationResource,
} from "@clerk/types";
import { Protect } from "@clerk/nextjs";
import { IconTrashXFilled, IconAt } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

type MembershipState = {
    members: OrganizationMembershipResource[];
    organization: OrganizationResource | null | undefined;
    invitations: OrganizationInvitationResource[];
};

function useOrganizationMembers(): MembershipState {
    const { organization } = useOrganization();
    const [state, setState] = useState<MembershipState>({
        organization: organization,
        members: [],
        invitations: [],
    });

    useEffect(() => {
        if (!organization) {
            return;
        }
        setState({ ...state, organization: organization });
        Promise.all([
            organization.getMemberships(),
            organization.getInvitations(),
        ]).then(([memberships, invites]) => {
            setState({
                ...state,
                members: memberships.data,
                invitations: invites.data.filter(
                    (invite) => invite.status === "pending",
                ), // invites can have status == "revoked"
            });
        });
    }, [!!organization]);

    return state;
}

const InviteUser: React.FC<{ organization: OrganizationResource }> = ({
    organization,
}) => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
        },
        validate: {
            email: isEmail("Invalid email"),
        },
    });

    const onSubmit = form.onSubmit(async (values) => {
        try {
            await organization
                ?.inviteMember({
                    emailAddress: values.email,
                    role: "org:member",
                })
                .then(() => {
                    notifications.show({
                        title: "User invited",
                        message: `User with email ${form.values.email} was successfully invited`,
                    });
                });
        } catch (error) {
            notifications.show({
                title: `Error: ${error}`,
                message: `Failed to invite user with email ${form.values.email}`,
                color: "red",
            });
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <Flex
                direction="row"
                align="flex-end"
                gap="lg"
                justify="center"
                mt="md"
            >
                <TextInput
                    withAsterisk
                    label="Invite member"
                    description="Enter email address of the user you want to invite to the organization"
                    placeholder="researcher@my.edu"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                />
                <Button type="submit">Invite</Button>
            </Flex>
        </form>
    );
};

const onDeleteMember = async (member?: OrganizationMembershipResource) => {
    if (!member) {
        return;
    }
    const userName = `${member.publicUserData.firstName} ${member.publicUserData.lastName}`;
    try {
        await member.destroy();
        notifications.show({
            title: "Removed user",
            message: ` ${userName} was successfully removed`,
        });
    } catch (error) {
        notifications.show({
            title: `Error: ${error}`,
            message: `Failed to remove user: ${userName}`,
            color: "red",
        });
    }
};

const onCancelInvite = async (invite: OrganizationInvitationResource) => {
    try {
        await invite.revoke();
        notifications.show({
            title: "Cancelled invitation",
            message: `Invitation to ${invite.emailAddress} was successfully cancelled`,
        });
    } catch (error) {
        notifications.show({
            title: `Error: ${error}`,
            message: `Failed to cancel invitation to ${invite.emailAddress}`,
            color: "red",
        });
    }
};

const InvitesTable: React.FC<{
    invitations: OrganizationInvitationResource[];
}> = ({ invitations }) => {
    if (!invitations.length) {
        return null;
    }

    return (
        <Table mt="xl">
            <Table.Caption style={{ captionSide: "top" }}>
                Invitations
            </Table.Caption>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th colSpan={2}>Email</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {invitations.map((invite) => (
                    <Table.Tr key={invite.id}>
                        <Table.Td>{invite.emailAddress}</Table.Td>
                        <Table.Td>
                            <IconTrashXFilled
                                onClick={() => onCancelInvite(invite)}
                                cursor="pointer"
                            />
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};

export const OrganizationMembersTable = () => {
    const { members, organization, invitations } = useOrganizationMembers();

    console.log(invitations);

    return (
        <Flex direction="column">
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>First Name</Table.Th>
                        <Table.Th>Last Name</Table.Th>
                        <Table.Th>
                            <Protect permission="org:sys_memberships:manage">
                                Delete
                            </Protect>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {members.map((member) => (
                        <Table.Tr key={member.id}>
                            <Table.Td>
                                <Avatar src={member.publicUserData.imageUrl} />
                            </Table.Td>
                            <Table.Td>
                                {member.publicUserData.firstName}
                            </Table.Td>
                            <Table.Td>
                                {member.publicUserData.lastName}
                            </Table.Td>
                            <Table.Td>
                                <Protect permission="org:sys_memberships:manage">
                                    <IconTrashXFilled
                                        onClick={() => onDeleteMember(member)}
                                        cursor="pointer"
                                    />
                                </Protect>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <Protect permission="org:sys_memberships:manage">
                <InvitesTable invitations={invitations} />
                {organization && <InviteUser organization={organization} />}
            </Protect>
        </Flex>
    );
};
