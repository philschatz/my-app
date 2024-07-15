"use client"

import { useSession } from "@clerk/nextjs"
import { useState } from "react"


function TokenTest({ token }: { token: string }) {
    const [result, setResult] = useState('')

    const onTest = () => {
        fetch('/api/restricted', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then(async (response) => {
            if (response.ok) {
                const msg = await response.text()
                alert(`Success!\n${msg}`)
            } else {
                alert('Failed!')
            }
        })
    }
    return (
        <div>
            <p>Your token is: <input type="text" readOnly value={token} /></p>
            <p>

                <button onClick={onTest}>
                    Test using this token to authenticate with the API
                </button>
            </p>
        </div>
    )
}


export function UserToken() {
    const { session, isSignedIn } = useSession()

    const [token, setToken] = useState('')

    if (!isSignedIn) {
        return <p>Sign in to see your token</p>
    }

    const onCreateToken = () => {
        session.getToken({ template: 'docker' }).then((token) => {
            setToken(token || '')
        })


    }


    return (
        <div>
            {!token && <button onClick={onCreateToken}>Create A Token</button>}
            {token && <TokenTest token={token} />}
        </div>
    )
}
