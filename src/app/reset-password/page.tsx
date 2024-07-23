"use client";

import {useState} from "react";
import {useAuth, useSignIn} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Button, PasswordInput, Stack, Text, TextInput, Title} from "@mantine/core";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";

export default function ResetPassword() {
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    const emailForm = useForm({
        initialValues: {
            email: "",
        },

        validate: {
            email: isEmail("Invalid email"),
        },
    });

    const resetForm = useForm({
        initialValues: {
            password: "",
            code: ""
        },

        validate: {
            password: isNotEmpty('Required'),
            code: isNotEmpty('Required'),
        },
    })

    if (!isLoaded) {
        return null;
    }

    // If the user is already signed in, redirect them to the home page
    if (isSignedIn) {
        router.push('/');
    }

    // Send the password reset code to the user's email
    const onSubmitEmail = emailForm.onSubmit(async (values) => {
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: values.email,
            })
            .then(_ => {
                setSuccessfulCreation(true);
                setError('');
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            });
    });

    // Reset the user's password.
    // Upon successful reset, the user will be signed in and redirected home
    const onSubmitReset = resetForm.onSubmit(async (values) => {
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code: values.code,
                password: values.password,
            })
            .then(result => {
                // Check if 2FA is required
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true);
                    setError('');
                } else if (result.status === 'complete') {
                    // Set the active session to
                    // the newly created session (user is now signed in)
                    setActive({ session: result.createdSessionId });
                    setError('');
                } else {
                    console.log(result);
                }
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage);
            });
    })

    return (
        <Stack align='center' justify='center'>
            <Title order={3}>Forgot Password?</Title>
            <form onSubmit={onSubmitEmail}>
                {!successfulCreation && (
                    <Stack>
                        <TextInput
                            type='email'
                            label='Please provide your email address'
                            placeholder='email@domain.com'
                            {...emailForm.getInputProps("email")}
                        />

                        <Button type='submit'>
                            Send password reset code
                        </Button>
                        {error && <Text>{error}</Text>}
                    </Stack>
                )}
            </form>

            <form onSubmit={onSubmitReset}>
                {successfulCreation && (
                    <Stack>
                        <PasswordInput
                            label='Enter your new password'
                            placeholder='password'
                            {...resetForm.getInputProps("password")}
                        />

                        <TextInput
                            label='Enter the password reset code that was sent to your email'
                            placeholder='123456'
                            {...resetForm.getInputProps("code")}
                        />

                        <Button type='submit'>
                            Reset Password
                        </Button>
                        {error && <Text>{error}</Text>}
                    </Stack>
                )}

                {secondFactor && <Text>2FA is required, but this UI does not handle that</Text>}
            </form>
        </Stack>
    );
}
