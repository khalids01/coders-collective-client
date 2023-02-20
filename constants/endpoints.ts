const endpoints = {
    server: {
        auth: {
            signup: '/signup',
            login: '/login',
            logout: '/logout',
            resetPassword: '/reset-password',
            verifyEmail: '/verify-email',
        },
        fileUpload: {
            image: '/upload-image',
        }
    },
    client: {
        login: '/auth/login',
        signup: '/auth/signup',
        dashboard: '/dashboard'
    }
}

export default endpoints;