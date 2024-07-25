import { Flex, Title } from "@mantine/core";
import Link from "next/link";

export const Complete = () => {
    return (
        <Flex direction="column" align="center" justify="center" mt="xxl">
            <Title>Your password has been reset</Title>
            <Link href="/dashboard">View Dashboard</Link>
        </Flex>
    );
};
