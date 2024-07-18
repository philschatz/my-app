"use client";

import { useUser } from "@clerk/nextjs";
import { TOTPResource } from "@clerk/types";
import Link from "next/link";
import * as React from "react";
import {Button, Group, Stack, Text, TextInput, Title} from "@mantine/core";
// import { QRCodeSVG } from "qrcode.react";
// import { GenerateBackupCodes } from "../page";

type AddTotpSteps = "add" | "verify" | "backupcodes" | "success";

type DisplayFormat = "qr" | "uri";

function AddTotpScreen({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
}) {
    const { user } = useUser();
    const [totp, setTOTP] = React.useState<TOTPResource | undefined>(undefined);
    const [displayFormat, setDisplayFormat] =
        React.useState<DisplayFormat>("qr");

    React.useEffect(() => {
        void user
            ?.createTOTP()
            .then((totp: TOTPResource) => {
                setTOTP(totp);
            })
            .catch((err) =>
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(err, null, 2)),
            );
    }, []);

    return (
        <Stack>
            <Title order={1}>Add TOTP MFA</Title>

            {totp && displayFormat === "qr" && (
                <Group>
                    {/* <QRCodeSVG value={totp?.uri || ""} size={200} /> */}
                    <Button onClick={() => setDisplayFormat("uri")}>
                        Use URI instead
                    </Button>
                </Group>
            )}
            {totp && displayFormat === "uri" && (
                <Group>
                    <Text>
                        {totp.uri}
                    </Text>
                    <Button onClick={() => setDisplayFormat("qr")}>
                        Use QR Code instead
                    </Button>
                </Group>
            )}
            <Group>
                <Button onClick={() => setStep("add")}>
                    Reset
                </Button>
            </Group>


            <Stack>
                <Text>Once you have set up your authentication app, verify your code</Text>
                <Button onClick={() => setStep("verify")}>Verify</Button>
            </Stack>

        </Stack>
    );
}

function VerifyTotpScreen({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
}) {
    const { user } = useUser();
    const [code, setCode] = React.useState("");

    const verifyTotp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await user?.verifyTOTP({ code });
            setStep("backupcodes");
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <Stack>
            <Title order={1}>Verify TOTP</Title>
            <form onSubmit={(e) => verifyTotp(e)}>
                <Stack>
                    <TextInput
                        type="text"
                        id="totp-code"
                        label='Enter the code from your authentication app'
                        onChange={(e) => setCode(e.currentTarget.value)}
                    />
                    <Button type="submit">Verify code</Button>
                    <Button onClick={() => setStep("add")}>Reset</Button>
                </Stack>
            </form>
        </Stack>
    );
}

function BackupCodeScreen({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
}) {
    return (
        <Stack>
            <Title order={1}>Backup codes</Title>
            <Text>
                Save this list of backup codes somewhere safe in case you
                need to access your account in an emergency
            </Text>
            {/* <GenerateBackupCodes /> */}
            <Button onClick={() => setStep("success")}>
                Finish
            </Button>
        </Stack>
    );
}

function SuccessScreen() {
    return (
        <Stack>
            <Title order={1}>Success!</Title>
            <Text>You have successfully added TOTP MFA via an authentication application.</Text>
        </Stack>
    );
}

export default function AddMFaScreen() {
    const [step, setStep] = React.useState<AddTotpSteps>("add");
    const { isLoaded, user } = useUser();

    if (!isLoaded) return null;

    if (!user) {
        return <Text>You must be logged in to access this page</Text>;
    }

    return (
        <>
            {step === "add" && <AddTotpScreen setStep={setStep} />}
            {step === "verify" && <VerifyTotpScreen setStep={setStep} />}
            {step === "backupcodes" && <BackupCodeScreen setStep={setStep} />}
            {step === "success" && <SuccessScreen />}
            <Link href="/manage-mfa">Manage MFA</Link>
        </>
    );
}
