
interface User {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    bio: string;
    description: string;
    occupation: string;
    skills: string [];
    avatar: string;
    cover: string;
    active: boolean;
    exp: number;
    last_seen: string;
    iat: number;
}

export default User;
