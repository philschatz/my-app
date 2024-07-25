import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, Flex, TextInput, Title } from "@mantine/core";
import { ResetStepProps } from "./types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { SetActive } from "@clerk/types";

export const RequestMFA: React.FC<
    ResetStepProps & { setActive: SetActive }
> = ({ onComplete, signIn, setActive, ...flowState }) => {
    const [isPending, setPending] = useState(false);

    const form = useForm({
        initialValues: {
            mfa: "",
        },
        validate: {
            mfa: isNotEmpty("is required"),
        },
    });

    const onSubmitCode = form.onSubmit(async (values) => {
        setPending(true);
        try {
            const result = await signIn.attemptSecondFactor({
                strategy: "totp",
                code: values.mfa,
            });
            if (result.status == "complete") {
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
                form.setFieldError("mfa", err.errors[0].longMessage);
            } else {
                reportError(err);
            }
            setPending(false);
        }
    });

    return (
        <form onSubmit={onSubmitCode}>
            <Flex
                direction="column"
                gap="md"
                mt="xl"
                align="center"
                justify="center"
            >
                <Title order={3}>MFA Code</Title>
                <TextInput
                    required
                    autoFocus
                    styles={{ input: { width: "300px" } }}
                    label="Enter your MFA code:"
                    description="If you've lost this, see your administrator for a reset"
                    {...form.getInputProps("mfa")}
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
                        Reset MFA
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
