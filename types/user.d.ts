interface User {
    _id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    email: string,
    avatar: string,
    is_active: boolean,
    role: 'Admin' | 'Developer' | 'User' | 'Moderator' | 'Premium_User',
}

export default User