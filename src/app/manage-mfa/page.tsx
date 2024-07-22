import { currentUser } from '@clerk/nextjs/server'
import {IconLockAccess} from '@tabler/icons-react';
import {QRTotp, ValidateTotp } from './totp'
import {Flex, Text, Title} from "@mantine/core";
import {ErrorAlert} from '@/components/errors';


export default async function AddMFaScreen() {
    const user = await currentUser()

    if (!user) return <ErrorAlert title="Access Denied" message="You must be logged in to access this page" icon={<IconLockAccess />} />
    if (user.totpEnabled) return <ErrorAlert title="MFA already enabled" message="You have already enabled MFA on your account" />

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
                by inputting it‘s current value below.
            </Text>
            <ValidateTotp />
        </Flex>
    )

}
