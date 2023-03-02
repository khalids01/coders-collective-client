import { GetServerSidePropsContext } from "next";
import { parseToken } from "./tokenStore";

export const withoutAuthentication = async (
    context: GetServerSidePropsContext,
) => {
    const session = parseToken(context.req);

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { isAuthenticated: true },
    };
};
