import { useState } from "react";
import { isEmail, useForm } from "@mantine/form";
import { Button, Flex, TextInput, Title } from "@mantine/core";
import { ResetStepProps } from "./types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

export const RequestEmail: React.FC<ResetStepProps> = ({
    onComplete,
    signIn,
    ...flowState
}) => {
    const [isPending, setPending] = useState(false);

    const form = useForm({
        initialValues: {
            email: "",
        },

        validate: {
            email: isEmail("Invalid email"),
        },
    });

    // Send the password reset code to the user's email
    const onSubmitEmail = form.onSubmit(async (values) => {
        setPending(true);

        try {
            const result = await signIn.create({
                strategy: "reset_password_email_code",
                identifier: values.email,
            });
            if (result.status == "needs_first_factor") {
                onComplete({
                    ...flowState,
                    nextStage: "code",
                    email: values.email,
                    signIn: result,
                });
            } else {
                reportError(`Unknown result code: ${result.status}`);
                setPending(false);
            }
        } catch (err: any) {
            if (isClerkAPIResponseError(err)) {
                form.setFieldError("email", err.errors[0].longMessage);
            } else {
                reportError(err);
            }
            setPending(false);
        }
    });

    return (
        <form onSubmit={onSubmitEmail}>
            <Flex
                gap="md"
                mt="xl"
                direction="column"
                align="center"
                justify="center"
            >
                <Title order={3}>Forgot Password?</Title>
                <TextInput
                    required
                    autoFocus
                    label="Please provide your email address"
                    placeholder="email@domain.com"
                    {...form.getInputProps("email")}
                />
                <Button type="submit" loading={isPending}>
                    Send password reset code
                </Button>
            </Flex>
        </form>
    );
};
