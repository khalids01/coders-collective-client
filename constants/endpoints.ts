
const endpoints = {
    server: {
        base: process.env.NEXT_PUBLIC_BASE_URL,
        auth: {
            login:  '/login',
            logout:  '/logout',
            signup:  '/signup',
            forgot_password:  '/forgot-password',
        },
        user: {
            me:  '/users/me'
        },
        fileUpload: {
            image:  '/upload-image',
        }
    },
    client: {
        login: '/auth/login',
        signup: '/auth/signup',
        dashboard: '/dashboard',
        chat: '/chat'
    }
}

export default endpoints;