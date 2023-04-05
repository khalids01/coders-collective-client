import { GetServerSidePropsContext } from "next";
import { parseToken } from "./tokenStore";
import { endpoints } from "@/constants";

export const requireAuthentication = async (
    context: GetServerSidePropsContext,
) => {
    const session = parseToken(context.req);

    if (!session) {
        return {
            redirect: {
                destination: endpoints.client.login,
                permanent: false,
            },
        };
    }

    return {
        props: { isAuthenticated: false },
    };
};
