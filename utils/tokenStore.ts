import Cookies from "universal-cookie";
import { CookieSetOptions } from '../types'

const cookies = new Cookies();

const expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + (7 * 24 * 60 * 60 * 1000))

const OPTIONS: CookieSetOptions = { path: "/", sameSite: true, expires: expirationDate };
const KEY = "coders_collective";

export const storeToken = (token: string) => {
  cookies.set(KEY, token, OPTIONS);
};

export const retrieveToken = (): string | null => {
  try {
    const token = cookies.get(KEY);
    if (token) {
      return token;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const removeToken = (): void => {
  cookies.remove(KEY, OPTIONS);
};

export const parseToken = (req: any): string | null => {
  const _cookies = new Cookies(req.headers.cookie);
  const token = _cookies.get(KEY);
  if (token) {
    return token;
  }
  return null;
};


export const refreshToken = () => { };

