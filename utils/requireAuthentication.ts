import { GetServerSidePropsContext } from "next";
import { parseToken } from "./tokenStore";

export const requireAuthentication = async (
    context: GetServerSidePropsContext,
) => {
    const session = parseToken(context.req);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    return {
        props: { isAuthenticated: false },
    };
};
