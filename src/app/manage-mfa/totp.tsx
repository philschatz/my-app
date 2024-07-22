"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useUser } from "@clerk/nextjs";
import { isClerkApiError } from "@/components/errors";
import { Skeleton, Flex, Button, NumberInput, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { TOTPResource } from "@clerk/types";
import { useForm } from "@mantine/form";

export const QRTotp = () => {
    const { user, isLoaded } = useUser();
    const [totp, setTOTP] = useState<TOTPResource | undefined>(undefined);

    useEffect(() => {
        user
            ?.createTOTP()
            .then((totp: TOTPResource) => {
                setTOTP(totp);
            })
            .catch((err) => {
                reportError(err);
            });
    }, [isLoaded]);

    if (!totp?.uri) return <Skeleton height={250} width={250} />;

    return (
        <QRCodeSVG
            value={totp.uri}
            size={250}
            level="Q"
            bgColor="#ffffff"
            fgColor="#000000"
        />
    );
};

export const ValidateTotp = () => {
    const [codes, setCodes] = useState<string[]>([]);
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            code: "",
        },
    });

    const onVerifyCode = form.onSubmit(async (values) => {
        if (!user) return;

        try {
            const result = await user.verifyTOTP({ code: values.code });

            if (result?.verified) {
                const backup = await user.createBackupCode();
                setCodes(backup.codes);
            } else {
                form.setFieldError("code", "Invalid code");
            }
        } catch (err: any) {
            console.error(err);
            form.setFieldError(
                "code",
                isClerkApiError(err)
                    ? err.errors[0].long_message
                    : "validating code failed",
            );
        }
    });

    const onComplete = () => {
        router.push("/");
    };

    if (!isLoaded) return <Skeleton height={20} width="100%" />;

    if (codes.length) {
        return (
            <Flex align="center" direction="column">
                <h3>Backup codes</h3>
                <Button mb="lg" onClick={onComplete}>
                    Done with Codes
                </Button>
                <Text mb="lg">
                    Store these codes in a safe place. They can be used to login
                    if you lose access to your authenticator app.
                </Text>

                <ul style={{ columnCount: 2 }}>
                    {codes.map((code, i) => (
                        <li key={i}>{code}</li>
                    ))}
                </ul>
            </Flex>
        );
    }

    return (
        <form onSubmit={onVerifyCode}>
            <Flex align="flex-start" justify="flex-start">
                <NumberInput
                    hideControls
                    styles={{
                        input: {
                            width: "140px",
                        },
                    }}
                    required
                    placeholder="Enter code"
                    key={form.key("code")}
                    {...form.getInputProps("code")}
                />
                <Button type="submit">Verify code</Button>
            </Flex>
        </form>
    );
};
