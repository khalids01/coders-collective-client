const BASE = '/api/v1/coders-collective'

const endpoints = {
    server: {
        base: BASE,
        auth: {
            login: BASE + '/login',
            logout: BASE + '/logout',
            signup: BASE + '/signup',
            forgot_password: BASE + '/forgot-password',
        },
        user: {
            me: BASE + '/users/me'
        },
        fileUpload: {
            image: BASE + '/upload-image',
        }
    },
    client: {
        login: '/auth/login',
        signup: '/auth/signup',
        dashboard: '/dashboard'
    }
}

export default endpoints;