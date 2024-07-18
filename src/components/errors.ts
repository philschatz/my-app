import { notifications } from "@mantine/notifications";

export const reportError = (error: any, title = 'An error occured') => {

    const message = (typeof error == 'object' && error.clerkError) ?
        error.errors.map((e: any) => `${e.message}: ${e.longMessage}`).join('\n')
        : JSON.stringify(error, null, 2)

    console.error('Error:', message);

    notifications.show({
        color: "red",
        title,
        message,
    });
}
