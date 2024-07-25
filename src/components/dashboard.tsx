import {
    Group,
    Paper,
    Text,
    ThemeIcon,
    SimpleGrid,
    Card,
    CardSection,
    Badge,
    Image,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

const data = [
    { title: "Signups", value: "4,145", diff: -13 },
    { title: "Study Completions", value: "13,456", diff: 14 },
    { title: "Study Abandonment", value: "%11.3", diff: -2.8 },
];

type Study = { title: string; description: string };

export function Dashboard() {
    const stats = data.map((stat) => {
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="apart">
                    <div>
                        <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                            {stat.title}
                        </Text>
                        <Text fw={700} fz="xl">
                            {stat.value}
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        style={{
                            color:
                                stat.diff > 0
                                    ? "var(--mantine-color-teal-6)"
                                    : "var(--mantine-color-red-6)",
                        }}
                        size={38}
                        radius="md"
                    >
                        <DiffIcon size="1.8rem" stroke={1.5} />
                    </ThemeIcon>
                </Group>
                <Text c="dimmed" fz="sm" mt="md">
                    <Text
                        component="span"
                        c={stat.diff > 0 ? "teal" : "red"}
                        fw={700}
                    >
                        {stat.diff}%
                    </Text>{" "}
                    {stat.diff > 0 ? "increase" : "decrease"} compared to last
                    month
                </Text>
            </Paper>
        );
    });

    return (
        <div>
            <SimpleGrid mt="xxl" cols={{ base: 1, sm: 3 }}>
                {stats}
            </SimpleGrid>
        </div>
    );
}
