//"use client";

import { currentUser } from '@clerk/nextjs/server'
import {IconLockAccess} from '@tabler/icons-react';
// import { TOTPResource } from "@clerk/types";
// import Link from "next/link";

// import * as React from "react";
// import { useForm, hasLength } from "@mantine/form";

import { QRTotp, ValidateTotp } from './totp'
import {Alert, Button, Flex, Skeleton, Stack, Text, TextInput, Title} from "@mantine/core";
import { ErrorAlert } from '@/components/errors';


// https://clerk.com/docs/references/javascript/user/totp#totp-example

// // import { GenerateBackupCodes } from "../page";


// type AddTotpSteps = "add" | "verify" | "backupcodes" | "success";

// type DisplayFormat = "qr" | "uri";



// const ValidateCode = () => {


//     return (
//         <Stack>
//             <Text>Once you have set up your authentication app, verify your code</Text>

//             <Flex align="flex-end" justify="flex-start">

//                 <TextInput
//                     styles={{
//                         input: {
//                             width: "140px",
//                         }
//                     }}
//                     type="text"
//                     id="totp-code"
//                     onChange={(e) => validateCode(e.currentTarget.value)}
//                 />
//                 <Button type="submit">Verify code</Button>

//             </Flex>

//         </Stack>
//     );
// }

// function AddTotpScreen({
//     setStep,
// }: {
//     setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
// }) {
//     const { user } = useUser();
//     const [totp, setTOTP] = React.useState<TOTPResource | undefined>(undefined);
//     const [displayFormat, setDisplayFormat] = React.useState<DisplayFormat>("qr");

//     React.useEffect(() => {

//         user?.createTOTP()
//             .then((totp: TOTPResource) => {
//                 setTOTP(totp);
//             })
//             .catch((err) => {
//                 reportError(err)
//             });

//     }, []);

//     if (!totp) return <Skeleton height={200} width={200} />;

//     console.log(totp?.uri)

//     const setCode = () => {

//     }
//     return (
//         <Stack>
//             <Title order={1}>Setup TOTP MFA</Title>


//             <Text>
//                 In order to use SafeInsights, you must enable multi-factor.
//                 Please scan the QR code below with an authenticator app such as
//                 Google Authenticator or Authy.
//             </Text>


//             <QRCodeSVG value={totp?.uri || ""} size={200} />

//             <ValidateCode />

//         </Stack>
//     );
// }

// function VerifyTotpScreen({
//     setStep,
// }: {
//     setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
// }) {
//     const { user } = useUser();
//     const [code, setCode] = React.useState("");
//     const form = useForm({
//         initialValues: {
//             code: ""
//         },
//         validate: {
//             code: hasLength(6)
//         }
//      });
//     const onSubmit = form.onSubmit(async (values) => {

//     }))
//     const verifyTotp = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await user?.verifyTOTP({ code });
//             setStep("backupcodes");
//         } catch (err) {
//             console.error(JSON.stringify(err, null, 2));
//         }
//     };

//     return (
//         <Stack>
//             <NumberInput order={1}>Verify TOTP</Title>
//             <form onSubmit={(e) => verifyTotp(e)}>
//                 <Stack>
//                     <Button onClick={() => setStep("add")}>Reset</Button>
//                 </Stack>
//             </form>
//         </Stack>
//     );
// }

// function BackupCodeScreen({
//     setStep,
// }: {
//     setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
// }) {
//     return (
//         <Stack>
//             <Title order={1}>Backup codes</Title>
//             <Text>
//                 Save this list of backup codes somewhere safe in case you
//                 need to access your account in an emergency
//             </Text>
//             {/* <GenerateBackupCodes /> */}
//             <Button onClick={() => setStep("success")}>
//                 Finish
//             </Button>
//         </Stack>
//     );
// }

// function SuccessScreen() {
//     return (
//         <Stack>
//             <Title order={1}>Success!</Title>
//             <Text>You have successfully added TOTP MFA via an authentication application.</Text>
//         </Stack>
//     );
// }



export default async function AddMFaScreen() {
    //const [step, setStep] = React.useState<AddTotpSteps>("add");
    //const { isLoaded, user } = useUser();
    const user = await currentUser()

    console.log(user)

    if (!user) return <ErrorAlert title="Access Denied" message="You must be logged in to access this page" icon={<IconLockAccess />} />
    if (user.totpEnabled) return <ErrorAlert title="MFA already enabled" message="You have already enabled MFA on your account" />

    // const { user: u } = useUser()
    // console.log(u)
    // //
    //if (!isLoaded) return null;

    // if (!user) {
    //     return <Text>You must be logged in to access this page</Text>;
    // }

    return (
        <Flex direction="column" align="center" justify="center" gap="lg">
            <Title order={1}>Setup TOTP MFA</Title>
            <Text>
                In order to use SafeInsights, you must enable multi-factor authentication.
                Please scan the QR code below with an authenticator app such as
                Google Authenticator or Authy.
            </Text>

            <QRTotp />

            <Text>
                Once you have set up your authentication app, verify your code
                by inputting it's current value below.
            </Text>

            <ValidateTotp />

        </Flex>
    )

}
