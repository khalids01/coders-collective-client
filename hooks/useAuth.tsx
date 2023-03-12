import { useUser, useToken } from ".";
import { useMutation, useQuery } from "@tanstack/react-query";
import loginService from "@/services/auth/login";
import signUpService from "@/services/auth/signup";
import logoutService from "@/services/auth/logout";
import { showNotification, updateNotification } from "@mantine/notifications";
import { endpoints, reactQueryKeys } from "@/constants";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const { clearToken, setToken } = useToken();
  const { clearUserData, setUser } = useUser();

  // signup mutation
  const { mutate: credentialSignupMutation, isLoading: signupLoading } =
    useMutation(signUpService, {
      onMutate: () => {
        showNotification({
          id: "signup-request",
          title: "Please wait!",
          message: "Processing your request.",
          loading: true,
        });
      },
      onSuccess: (data: AxiosResponse) => {
        setToken(data?.data?.token);
        // setUser(data?.data?.user);
        updateNotification({
          id: "signup-request",
          title: "Success!",
          message: data?.data?.message || "Success!",
          color: "teal",
        });
        router.push(endpoints.client.chat);
      },
      onError: (err: AxiosError) => {
        updateNotification({
          id: "signup-request",
          // @ts-ignore
          title: err.response?.data?.message || "Error!",
          message: "",
          color: "red",
        });

        // @ts-ignore
        err?.response?.data?.errors?.forEach((msg: string) => {
          showNotification({
            id: "signup-request-failed",
            title: msg || "Error",
            message: "",
            color: "red",
          });
        });
      },
    });

  // login mutation
  const { mutate: credentialLoginMutation, isLoading: loginLoading } =
    useMutation(loginService, {
      onMutate: () => {
        showNotification({
          id: "login-request",
          title: "Please wait!",
          message: "Processing your request.",
          loading: true,
        });
      },
      onSuccess: (data) => {
        setToken(data?.data?.token);
        // setUser(data?.data?.user);
        updateNotification({
          id: "login-request",
          title: "Welcome!",
          message: "Successfully logged in.",
          color: "teal",
        });
        router.push(endpoints.client.chat);
      },
      onError: (err: AxiosError) => {
        console.log(err.response?.data)
        updateNotification({
          id: "login-request",
        // @ts-ignore
          title: err.response?.data?.message || "Error!",
        // @ts-ignore
          message: err.response?.data?.errors[0],
          color: "red",
        });

      },
    });

  // logout query
  const { refetch: logoutRequest, isLoading: logoutLoading } = useQuery(
    [reactQueryKeys.logout],
    () => {
      return logoutService();
    },
    {
      enabled: false,
      onSuccess(data) {
        clearToken();
        clearUserData();
        showNotification({
          id: "logout",
          title: "Logged out.",
          message: "Redirect to homepage",
          color: "purple",
        });
      },
      onError(err) {
        showNotification({
          id: "logout",
          title: "Error!",
          message: "Something went wrong.",
          color: "red",
        });
      },
    }
  );

  return {
    logout: logoutRequest,
    credentialLogin: credentialLoginMutation,
    credentialSignup: credentialSignupMutation,
    signupLoading,
    loginLoading,
    logoutLoading,
  };
};

export default useAuth;
