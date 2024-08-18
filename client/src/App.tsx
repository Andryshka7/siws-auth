import { PhantomWalletName } from '@solana/wallet-adapter-phantom'
import { useWallet } from '@solana/wallet-adapter-react'
import { SignInButton, SignOutButton } from 'components'
import { useAuth } from 'hooks'
import { useEffect } from 'react'

const App = () => {
    const {
        auth: { isLoading, isVerified },
        fetchAuth
    } = useAuth()
    const { select } = useWallet()

    useEffect(() => {
        fetchAuth()
        select(PhantomWalletName)
    }, [])

    if (isLoading) {
        return <h3 className='mt-80 text-center text-xl font-medium'>Checking auth status...</h3>
    }

    return (
        <div className='mx-auto mt-80 w-fit'>
            {isVerified ? <SignOutButton /> : <SignInButton />}
        </div>
    )
}

export default App
