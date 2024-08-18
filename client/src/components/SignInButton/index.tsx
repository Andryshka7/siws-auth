import { useSignInWithSolana } from 'hooks'

const SignInButton = () => {
    const signInWithSolana = useSignInWithSolana()

    return (
        <button
            onClick={signInWithSolana}
            className='flex h-12 w-36 items-center justify-center gap-2 rounded bg-[#9886E5] text-xl font-medium duration-200 hover:bg-opacity-80'
        >
            <img src='/phantom.svg' className='mt-1 h-8 w-8' alt='' />
            Sign in
        </button>
    )
}

export default SignInButton
