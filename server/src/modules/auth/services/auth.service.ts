import type { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features'
import { verifySignIn } from '@solana/wallet-standard-util'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
    createSignInData() {
        const now: Date = new Date()

        const signInData: SolanaSignInInput = {
            domain: 'localhost:5173',
            statement:
                'Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.',
            version: '1',
            nonce: '1BRVxHgn',
            chainId: 'mainnet',
            issuedAt: now.toISOString(),
            resources: ['http://localhost:4000', 'https://phantom.app/']
        }

        return signInData
    }

    verifySIWS(input: SolanaSignInInput, output: SolanaSignInOutput): boolean {
        const serialisedOutput: SolanaSignInOutput = {
            account: {
                ...output.account,
                publicKey: new Uint8Array(Object.values(output.account.publicKey))
            },
            signature: new Uint8Array(Buffer.from(output.signature)),
            signedMessage: new Uint8Array(Buffer.from(output.signedMessage))
        }

        return verifySignIn(input, serialisedOutput)
    }
}
