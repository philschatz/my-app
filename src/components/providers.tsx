import { ClerkProvider } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

type Props = {
  children: React.ReactNode
};

export const Providers: React.FC<Props> = ({ children }) => {

    return (
        <MantineProvider theme={theme}>
            <ClerkProvider>
                {children}
            </ClerkProvider>
        </MantineProvider>
    )

}
