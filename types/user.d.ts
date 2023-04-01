
interface User {
    _id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    bio: string;
    description: string;
    occupation: string;
    skills: string [];
    avatar: string;
    cover: string;
    active: boolean;
    exp: number;
    iat: number;
}

export default User;
