"use client";

import { useState } from "react";
import { useSignIn, useSession } from "@clerk/nextjs";
import { Skeleton, Stack } from "@mantine/core";
import { RequestEmail } from "./email";
import { onCompleteCallback, ResetData, Stage } from "./types";
import { RequestCode } from "./code";
import { RequestPassword } from "./password";
import { Complete } from "./complete";
import { RequestMFA } from "./mfa";
import { ErrorAlert } from "@/components/errors";

type PasswordResetState = ResetData & {
    stage: Stage;
};

export default function ResetPasswordFlow() {
    const { isSignedIn } = useSession();

    const { isLoaded, signIn, setActive } = useSignIn();

    const [state, setState] = useState<PasswordResetState>({
        signIn: signIn!,
        stage: "email",
        email: "",
        password: "",
        code: "",
    });

    const onComplete: onCompleteCallback = ({ nextStage, ...state }) => {
        setState({ ...state, stage: nextStage });
    };

    if (!isLoaded || !signIn) {
        return <Skeleton height="10rem" />;
    } else if (state.stage === "complete") {
        return <Complete />;
    } else if (isSignedIn) {
        return (
            <ErrorAlert
                title="You are already signed in"
                message="You can change your password from your profile page."
            />
        );
    } else if (state.stage === "email") {
        return (
            <RequestEmail onComplete={onComplete} {...state} signIn={signIn} />
        );
    } else if (state.stage === "code") {
        return <RequestCode onComplete={onComplete} {...state} />;
    } else if (state.stage === "password") {
        return (
            <RequestPassword
                onComplete={onComplete}
                setActive={setActive}
                {...state}
            />
        );
    } else if (state.stage === "mfa") {
        return (
            <RequestMFA
                onComplete={onComplete}
                setActive={setActive}
                {...state}
            />
        );
    }

    return <ErrorAlert message={`Invalid state: ${state.stage}`} />;
}
