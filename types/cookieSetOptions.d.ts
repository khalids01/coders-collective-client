interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | "none" | "lax" | "strict";
    encode?: (value: string) => string;
}

export default CookieSetOptions