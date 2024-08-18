import { useMemo, PropsWithChildren } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletError } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

const solanaEndpoint = 'https://api.mainnet-beta.solana.com'

const SolanaWalletProvider = ({ children }: PropsWithChildren) => {
    const wallets = useMemo(() => [], [])

    const onError = (error: WalletError) => {
        console.error(error)
    }

    return (
        <ConnectionProvider endpoint={solanaEndpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default SolanaWalletProvider
