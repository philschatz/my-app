import NextLink from "next/link";
import type {NavLinkProps as MantineNavLinkProps} from "@mantine/core"
import {NavLink as MantineNavLink} from "@mantine/core"
import {IconChevronRight, IconLock, IconShieldLock, IconStar} from '@tabler/icons-react';


type NavLinkProps = MantineNavLinkProps & {
    to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, ...props }) => {

    return (
        <NextLink passHref legacyBehavior href={to}>

            <MantineNavLink href={'#'} {...props}
            rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
            }
            />
        </NextLink>
    )
}

export const NavigationPanel = () => {

    return (

        <>
            <NavLink
                to="/protected"
                label="Link to a protected page"
                leftSection={<IconLock size="1rem" stroke={1.5} />}
            />
            <NavLink
                to="/admin"
                label="Link to an admin page"
                leftSection={<IconShieldLock size="1rem" stroke={1.5} />}
            />
            <NavLink
                to="/signup"
                label="Sign up"
                leftSection={<IconStar size="1rem" stroke={1.5} />}
            />
        </>

    )
}
