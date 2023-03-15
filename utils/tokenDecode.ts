import decode from "jwt-decode";
import type { DecodedToken } from "@/types";

export const tokenDecode = (token: string) => {
  const decodedToken: DecodedToken = decode(token);
  if (new Date().getTime() > decodedToken?.exp * 1000) {
    return null;
  }

  return decodedToken;
};
