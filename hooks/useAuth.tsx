import { useUser, useToken } from '.'
import { useMutation, useQuery } from '@tanstack/react-query'
import loginService from '../services/auth/login'
import signupService from '../services/auth/signup'
import logoutService from '../services/auth/logout'
import { showNotification, updateNotification } from '@mantine/notifications'
import { reactQueryKeys } from '../constants'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

const useAuth = () => {
    const router = useRouter()
    const { clearToken, setToken } = useToken()
    const { clearUserData, setUser } = useUser()


    // signup mutation
    const { mutate: credentialSignupMutation } = useMutation(signupService, {
        onMutate: () => {
            showNotification({
                id: 'signup-request',
                title: 'Please wait!',
                message: 'Processing your request.',
                loading: true,
            })
        },
        onSuccess: (data: AxiosResponse) => {
            setToken(data?.data?.token)
            setUser(data?.data?.user)
            updateNotification({
                id: 'signup-request',
                title: 'Welcome!',
                message: 'Successfully Signed up.',
                color: 'teal',
            })
            router.push('/dashboard/messenger')
        },
        onError: (err: AxiosError) => {
            console.log('signup error : ', err?.response?.data);

            updateNotification({
                id: 'signup-request',
                title: 'Error!',
                message: 'Signup failed.',
                color: 'red',
            })

            // @ts-ignore
            err?.response?.data?.error?.message?.forEach((msg: string) => {
                showNotification({
                    id: 'signup-request-failed',
                    title: msg || 'Error',
                    message: '',
                    color: 'red',
                })
            })
        }

    })

    // login mutation
    const { mutate: credentialLoginMutation } = useMutation(loginService, {
        onMutate: () => {
            showNotification({
                id: 'login-request',
                title: 'Please wait!',
                message: 'Processing your request.',
                loading: true,
            })
        },
        onSuccess: (data) => {
            setToken(data?.data?.token)
            setUser(data?.data?.user)
            updateNotification({
                id: 'login-request',
                title: 'Welcome!',
                message: 'Successfully logged in.',
                color: 'teal',
            })
            router.push('/dashboard/messenger')
        },
        onError: (err) => {
            updateNotification({
                id: 'login-request',
                title: 'Error!',
                message: 'Login failed.',
                color: 'red',
            })


            // @ts-ignore
            err?.response?.data?.error?.message?.forEach((msg: string) => {
                showNotification({
                    id: 'login-request-failed',
                    title: msg || 'Error',
                    message: '',
                    color: 'red',
                })
            })
        }

    })

    // logout query
    const { refetch: logoutRequest } = useQuery([reactQueryKeys.logout], () => {
        return logoutService()
    },
        {
            enabled: false,
            onSuccess(data) {
                clearToken();
                clearUserData();
                showNotification({
                    id: 'logout',
                    title: 'Logged out.',
                    message: 'Redirect to homepage',
                    color: 'purple'
                })
            },
            onError(err) {
                showNotification({
                    id: 'logout',
                    title: 'Error!',
                    message: 'Something went wrong.',
                    color: 'red'
                })
            }
        }
    )

    const credentialSignup = ({ formData }: { formData: FormData }): void => {
        credentialSignupMutation(formData)
    }

    const credentialLogin = ({ email, password }: { email: string, password: string }): void => {
        credentialLoginMutation({ email, password })
    }

    const logout = (): void => {
        logoutRequest()
    }

    return {
        logout,
        credentialLogin,
        credentialSignup
    }
}

export default useAuth