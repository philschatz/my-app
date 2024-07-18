'use client'

import React, { useEffect, useState } from 'react';
import { useSession, useClerk } from '@clerk/nextjs';
import { Clerk } from '@clerk/types'
import { Button, Flex } from '@mantine/core';

const MAX_SECONDS = 15

const onSignInClick = async (clerk: Clerk) => {
    if (clerk.session?.status == 'active') {
        await clerk.session?.end();
    }
    clerk.openSignIn();
}

export const Timer: React.FC = () => {
    const { isLoaded, isSignedIn, session } = useSession();
    const clerk = useClerk();
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if (session) {
            setCount(((new Date).getTime() - session.createdAt.getTime()) / 1000);
        }
    }, [session]);

    useEffect(() => {
        if (count >= MAX_SECONDS) {
            return
        }
        const timer = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);


        return () => clearInterval(timer);
    }, [count]);

    if (!isLoaded) return null;

    if (!isSignedIn || count >= MAX_SECONDS) {
        const invalidReason = isSignedIn ? `more than ${MAX_SECONDS} seconds since login` : 'not logged in'

        return (
            <Flex justify="center" align="center" mt="xl" direction="column">
                <h1>Sesion invalid, {invalidReason}</h1>
                <Button onClick={() => onSignInClick(clerk)}>Sign in</Button>
            </Flex>
        )
    }

    return (
        <h1>Session valid for: {MAX_SECONDS - Math.round(count)} seconds</h1>
    );
};
