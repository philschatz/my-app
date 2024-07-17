"use client";
import styles from "../page.module.css";
import {Button, Group, Loader, PasswordInput, TextInput, Title} from "@mantine/core";
import {useSignUp} from "@clerk/nextjs";
import {isEmail, useForm} from "@mantine/form";

export default function Signup() {
    const { isLoaded, signUp } = useSignUp();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: isEmail('Invalid email')
        },
    });

    if (!isLoaded) {
        // Add logic to handle loading state
        return <Loader />;
    }
    console.log(signUp);

    return (
        <main className={styles.main}>
            <Title order={3}>Signup</Title>
            <div>The current sign-up attempt status is {signUp.status}.</div>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    withAsterisk
                    label="Password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />


                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </main>
    );
}
