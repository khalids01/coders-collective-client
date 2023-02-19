export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    error: string[],
    message: string[],
    success: boolean,
    token: string,
    user: User
} 
