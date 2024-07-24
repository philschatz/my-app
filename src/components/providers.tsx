import { ClerkProvider } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { ModalsProvider } from "@mantine/modals";
import AppContext from "@/AppContext";

type Props = {
    children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <AppContext.Provider value={{ SignedIn, SignedOut }}>
                    <ClerkProvider>{children}</ClerkProvider>
                </AppContext.Provider>
            </ModalsProvider>
        </MantineProvider>
    );
};
