import { useAuth } from 'hooks'

const SignOutButton = () => {
    const { updateAuth } = useAuth()

    const signOut = async () => {
        const response = await fetch('http://localhost:4000/auth/signOut', {
            method: 'POST',
            credentials: 'include'
        })
        if (response.ok) {
            console.log('Successfully signed out')

            updateAuth({ isVerified: false })
        }
    }

    return (
        <button
            className='h-12 w-36 items-center rounded bg-[#9886E5] text-xl font-medium duration-200 hover:bg-opacity-80'
            onClick={signOut}
        >
            Sign out
        </button>
    )
}

export default SignOutButton
