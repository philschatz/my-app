"use client";
import {Button, Checkbox, Group, Loader, PasswordInput, Stack, Text, TextInput, Title} from "@mantine/core";
import {useSignUp} from "@clerk/nextjs";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";
import {redirect} from "next/navigation";
import {useState} from "react";

interface SignUpFormValues {
    email: string;
    password: string;
    termsOfService: boolean;
}

interface EmailVerificationFormValues {
    code: string;
}

export default function Signup() {
    const { isLoaded, signUp } = useSignUp();
    const [verifying, setVerifying] = useState(false)

    const form = useForm<SignUpFormValues>({
        initialValues: {
            email: '',
            password: '',
            termsOfService: false
        },

        validate: {
            email: isEmail('Invalid email'),
            password: isNotEmpty('Required'),
            termsOfService: isNotEmpty('You must accept terms of use')
        },
    });

    if (!isLoaded) {
        // Add logic to handle loading state
        return <Loader />;
    }

    if (verifying) {
        return <EmailVerificationStep />
    }

    if (signUp?.status === "complete") {
        redirect("/")
    }

    const onSubmit = async (values: SignUpFormValues) => {
        if (!isLoaded) return;

        try {
            await signUp.create({
                emailAddressOrPhoneNumber: values.email,
                password: values.password
            })

            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            setVerifying(true);
        } catch {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    return (
        <Stack>
            <Title order={3}>Signup</Title>

            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
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
                    width={400}
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />

                <Checkbox
                    mt="md"
                    label="I agree to the terms of service"
                    key={form.key('termsOfService')}
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Stack>
    );
}

const EmailVerificationStep = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const verifyForm = useForm<EmailVerificationFormValues>()

    const handleVerify = async (values: EmailVerificationFormValues) => {
        if (!isLoaded) return;
        console.log(values);

        try {
            // Use the code the user provided to attempt verification
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: values.code,
            });

            // If verification was completed, set the session to active
            // and redirect the user
            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                redirect('/')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err: any) {
            console.error('Error:', JSON.stringify(err, null, 2));
        }
    };

    return (
        <Stack>
            <Text>We have emailed you a code, please enter that code here to finish signing up, thanks!</Text>
            <form onSubmit={verifyForm.onSubmit((values) => handleVerify(values))}>
                <TextInput
                    withAsterisk
                    label="Code"
                    key={verifyForm.key('code')}
                    {...verifyForm.getInputProps('code')}
                />


                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Stack>
    )
}
