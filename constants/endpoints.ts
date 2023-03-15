
const endpoints = {
    server: {
        base: process.env.NEXT_PUBLIC_BASE_URL,
        auth: {
            login:  '/login',
            logout:  '/logout',
            signup:  '/signup',
            reset_password:  '/reset-password',
        },
        user: {
            me:  '/users/me'
        },
        fileUpload: {
            image:  '/upload-image',
        },
        chat: {
            friends: '/friends'
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