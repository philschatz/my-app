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

// chatgpt: in JSON format, list 10 research studies that are studying eduction topics.  Each study should have a title and description
const STUDIES: Study[] = [
    {
        title: "The Impact of Technology on Student Learning Outcomes",
        description:
            "This study investigates how the integration of technology in classrooms affects students' academic performance and engagement.",
    },
    {
        title: "Effective Strategies for Teaching Students with Learning Disabilities",
        description:
            "This research explores various instructional strategies and their effectiveness in supporting students with learning disabilities.",
    },
    {
        title: "The Role of Socioeconomic Status in Educational Achievement",
        description:
            "This study examines the influence of socioeconomic factors on students' academic success and access to educational resources.",
    },
    {
        title: "Innovative Teaching Methods in STEM Education",
        description:
            "This research focuses on new and innovative teaching methods in science, technology, engineering, and mathematics (STEM) education.",
    },
    {
        title: "The Effectiveness of Online Learning During the COVID-19 Pandemic",
        description:
            "This study evaluates the effectiveness and challenges of online learning implemented during the COVID-19 pandemic.",
    },
    {
        title: "Cultural Diversity and Its Impact on Classroom Dynamics",
        description:
            "This research investigates how cultural diversity among students influences classroom interactions and learning experiences.",
    },
    {
        title: "Teacher Training Programs and Student Achievement",
        description:
            "This study examines the relationship between the quality of teacher training programs and student academic performance.",
    },
    {
        title: "The Role of Parental Involvement in Children's Education",
        description:
            "This study investigates how different levels of parental involvement impact children's educational outcomes.",
    },
    {
        title: "Assessment of Social-Emotional Learning in Schools",
        description:
            "This research focuses on the implementation and effectiveness of social-emotional learning programs in schools.",
    },
    {
        title: "The Impact of Socioeconomic Class on Student Performance",
        description:
            "This study examines how varying class sizes affect student academic achievement and teacher-student interactions.",
    },
    {
        title: "Project-Based Learning and Student Engagement",
        description:
            "This research investigates the effectiveness of project-based learning in enhancing student engagement and understanding of subject matter.",
    },
    {
        title: "The Influence of School Leadership on Educational Outcomes",
        description:
            "This study explores the role of school leadership and administrative practices in shaping educational outcomes for students.",
    },
    {
        title: "Gender Differences in STEM Education",
        description:
            "This research examines the factors contributing to gender disparities in STEM education and strategies to promote gender equality.",
    },
    {
        title: "The Effects of Bilingual Education on Cognitive Development",
        description:
            "This study investigates how bilingual education programs influence cognitive development and academic performance in students.",
    },
    {
        title: "The Role of Extracurricular Activities in Student Development",
        description:
            "This research explores the impact of participation in extracurricular activities on students' social, emotional, and academic development.",
    },
];

const StudyCard: React.FC<Study & { index: number; isNew: boolean }> = ({
    title,
    description,
    index,
    isNew,
}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <CardSection style={{ position: "relative" }}>
                <Image
                    src={`https://loremflickr.com/320/240/learn?random=${index}`}
                    height={160}
                />
                {isNew && (
                    <Badge
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                        }}
                        color="green"
                    >
                        NEW
                    </Badge>
                )}
            </CardSection>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
            </Group>

            <Text size="sm" c="dimmed">
                {description}
            </Text>
        </Card>
    );
};

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
            <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="lg">
                {STUDIES.map((study, i) => (
                    <StudyCard
                        {...study}
                        index={i}
                        key={i}
                        isNew={Math.random() > 0.7}
                    />
                ))}
            </SimpleGrid>
        </div>
    );
}
