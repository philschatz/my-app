import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
<<<<<<< HEAD
import { ModalsProvider } from "@mantine/modals";
=======
>>>>>>> 7945c7d (run prettier:fix)

type Props = {
    children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
    return (
        <MantineProvider theme={theme}>
<<<<<<< HEAD
            <ModalsProvider>
                <ClerkProvider>{children}</ClerkProvider>
            </ModalsProvider>
=======
            <ClerkProvider>{children}</ClerkProvider>
>>>>>>> 7945c7d (run prettier:fix)
        </MantineProvider>
    );
};
