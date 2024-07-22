"use client";

import {
    Input,
    InputProps,
} from "@mantine/core";
import { ChangeEvent, useCallback, useState } from "react";

function debounce<TArgs extends any[]>(
    func: (...args: TArgs) => void,
    timeout = 1000,
) {
    let timer = null as unknown as NodeJS.Timeout;
    return (...args: TArgs) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.call(null, ...args);
        }, timeout);
    };
}

type DebouncedInputProps = InputProps & {
    value: string;
    placeholder?: string;
    onValueChanged: (newValue: string, oldValue: string) => Promise<void>;
};

// TODO: There's probably a better way to generically debounce + disable + save + enable more widgets like checkboxes and buttons
export default function DebouncedInput({
    placeholder,
    value: originalValue,
    onValueChanged,
}: DebouncedInputProps) {
    const [value, setValue] = useState(originalValue);
    const [isDisabled, setDisabled] = useState(false);

    const changeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        setDisabled(true);
        await onValueChanged(event.target.value, originalValue);
        setDisabled(false);
    };
    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 300),
        [],
    );

    return (
        <Input
            disabled={isDisabled}
            placeholder={placeholder}
            value={value}
            onChange={(evt) => {
                setValue(evt.target.value);
                debouncedChangeHandler(evt);
            }}
        />
    );
}
