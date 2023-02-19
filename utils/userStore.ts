import Cookies from "universal-cookie";
import { CookieSetOptions, User } from '../types'

const cookies = new Cookies();
const expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + (7 * 24 * 60 * 60 * 1000))

const OPTIONS: CookieSetOptions = { path: "/", sameSite: true, expires: expirationDate };
const KEY = "user";

export const storeUser = (user: User): void => {
    cookies.set(KEY, user, OPTIONS)
}

export const retrieveUser = (): User | null => {
    try {
        const user = cookies.get(KEY);
        if (user) {
            return user;
        }
        return null;
    } catch (e) {
        return null;
    }
};

export const removeUser = (): void => {
    cookies.remove(KEY, OPTIONS);
};

export const parseUser = (req: any): User | null => {
    const _cookies = new Cookies(req.headers.cookie);
    const user = _cookies.get(KEY);
    if (user) {
        return user;
    }
    return null;
};