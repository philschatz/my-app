'use client';

import { AppShell, Group  } from '@mantine/core';
import { SafeInsightsLogo } from './si-logo'
import { NavAuthMenu } from './nav-auth-menu';

type Props = {
  children: React.ReactNode
};

export function AppLayout({ children}: Props) {


    return (
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                }}
                padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify='space-between'>
                    <SafeInsightsLogo height={30} />
                    <NavAuthMenu />
                </Group>
            </AppShell.Header>

                <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

                <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
    );
}
