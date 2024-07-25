import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, Flex, PasswordInput, Title } from "@mantine/core";
import { ResetStepProps } from "./types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { SetActive } from "@clerk/types";

export const RequestPassword: React.FC<
    ResetStepProps & { setActive: SetActive }
> = ({ onComplete, signIn, setActive, ...flowState }) => {
    const [isPending, setPending] = useState(false);

    const form = useForm({
        initialValues: {
            password: "",
        },

        validate: {
            password: isNotEmpty("is required"),
        },
    });

    const onSubmitPassword = form.onSubmit(async (values) => {
        setPending(true);
        try {
            const result = await signIn.resetPassword({
                password: values.password,
                signOutOfOtherSessions: true,
            });

            if (result.status == "needs_second_factor") {
                onComplete({
                    nextStage: "mfa",
                    ...flowState,
                    password: values.password,
                    signIn: result,
                });
            } else if (result.status == "complete") {
                setActive({ session: result.createdSessionId });
                onComplete({
                    nextStage: "complete",
                    ...flowState,
                    signIn: result,
                });
            } else {
                reportError(`Unknown result code: ${result.status}`);
                setPending(false);
            }
        } catch (err: any) {
            if (isClerkAPIResponseError(err)) {
                form.setFieldError("password", err.errors[0].longMessage);
            } else {
                reportError(err);
            }
            setPending(false);
        }
    });

    return (
        <form onSubmit={onSubmitPassword}>
            <Flex
                direction="column"
                gap="md"
                mt="xl"
                align="center"
                justify="center"
            >
                <Title order={3}>New Password</Title>
                <PasswordInput
                    required
                    autoFocus
                    styles={{ input: { width: "300px" } }}
                    label="Enter your new password"
                    {...form.getInputProps("password")}
                />
                <Flex justify="space-between" gap="lg">
                    <Button
                        color="gray"
                        onClick={() =>
                            onComplete({
                                nextStage: "email",
                                ...flowState,
                                signIn,
                            })
                        }
                    >
                        Re-Enter Email
                    </Button>
                    <Button type="submit" loading={isPending}>
                        Reset Password
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
