import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, Flex, TextInput, Title } from "@mantine/core";
import { ResetStepProps } from "./types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

export const RequestCode: React.FC<ResetStepProps> = ({
    onComplete,
    signIn,
    ...flowState
}) => {
    const [isPending, setPending] = useState(false);

    const form = useForm({
        initialValues: {
            code: "",
        },

        validate: {
            code: isNotEmpty("code is required"),
        },
    });

    const onSubmitEmail = form.onSubmit(async (values) => {
        setPending(true);
        try {
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: values.code,
            });

            if (result.status == "needs_new_password") {
                onComplete({
                    nextStage: "password",
                    ...flowState,
                    code: values.code,
                    signIn: result,
                });
            } else {
                reportError(`Unknown result code: ${result.status}`);
                setPending(false);
            }
        } catch (err: any) {
            if (isClerkAPIResponseError(err)) {
                form.setFieldError("code", err.errors[0].longMessage);
            } else {
                reportError(err);
            }
            setPending(false);
        }
    });

    return (
        <form onSubmit={onSubmitEmail}>
            <Flex
                direction="column"
                gap="md"
                mt="xl"
                align="center"
                justify="center"
            >
                <Title order={3}>Code from email</Title>
                <TextInput
                    required
                    autoFocus
                    label="Please provide the code from the password reset email"
                    placeholder="123456"
                    {...form.getInputProps("code")}
                />
                <Flex justify="space-between" gap="lg" flex="1">
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
                        Validate Code
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
