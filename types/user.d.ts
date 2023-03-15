import DecodedToken from "./decodedToken";

interface User extends DecodedToken {
    is_active: boolean;
}

export default User;
