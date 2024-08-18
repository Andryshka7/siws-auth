import { useWallet } from '@solana/wallet-adapter-react'
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features'
import { useAuth } from 'hooks'
import { useCallback } from 'react'

const useSignInWithSolana = () => {
    const { signIn } = useWallet()
    const { updateAuth } = useAuth()

    const signInWithSolana = useCallback(async () => {
        try {
            if (!signIn) {
                throw new Error('signIn is not defined')
            }

            const createSignInDataResponse = await fetch(
                'http://localhost:4000/auth/createSignInData'
            )

            const input = (await createSignInDataResponse.json()) as SolanaSignInInput

            const signInResult = await signIn(input)

            const output: SolanaSignInOutput = {
                ...signInResult,
                account: {
                    address: signInResult.account.address,
                    publicKey: signInResult.account.publicKey,
                    chains: signInResult.account.chains,
                    features: signInResult.account.features,
                    label: signInResult.account.label,
                    icon: signInResult.account.icon
                }
            }

            const verifyResponse = await fetch('http://localhost:4000/auth/signIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ input, output })
            })

            const isVerified = await verifyResponse.json()

            if (isVerified) {
                updateAuth({ isVerified: true })
                console.log('Successfully signed in')
            }
        } catch (err) {
            console.error(err)
        }
    }, [signIn])

    return signInWithSolana
}

export default useSignInWithSolana
