"use client";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export async function withConfirm(onConfirm: () => any) {
    modals.openConfirmModal({
        title: "Confirmation Dialog",
        children: <Text>Are you sure?</Text>,
        labels: { confirm: "Confirm", cancel: "Cancel" },
        onConfirm,
    });
}
