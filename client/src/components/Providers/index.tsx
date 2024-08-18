import { PropsWithChildren } from 'react'
import SolanaWalletProvider from './SolanaWalletProvider'

const Providers = ({ children }: PropsWithChildren) => (
    <SolanaWalletProvider>{children}</SolanaWalletProvider>
)

export default Providers
