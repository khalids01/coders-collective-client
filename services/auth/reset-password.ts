import { endpoints } from "../../constants";
import api from "../api";

export const resetPasswordRequest = ({ email }: { email: string }) => {
  const url = new URL(endpoints.server.auth.reset_password);

  url.searchParams.append("email", email);

  const res = api.get(endpoints.server.auth.login);

  return res;
};

export const resetPassword = ({code, newPassword}: {code: number, newPassword: string}) =>{
  const res = api.put(endpoints.server.auth.reset_password, {code, newPassword})

  return res;
}
