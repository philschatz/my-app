export type Stage = "email" | "code" | "password" | "mfa" | "complete";
import { SignInResource } from "@clerk/types";

export type ResetData = {
    signIn: SignInResource;
    email: string;
    code: string;
    password: string;
};

export type onCompleteCallback = (
    opts: { nextStage: Stage } & ResetData,
) => void;

export type ResetStepProps = ResetData & {
    onComplete: onCompleteCallback;
};
