import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import { User } from "../types";
import { storeUser, retrieveUser, removeUser } from '../utils/userStore'
import { reactQueryKeys } from '@/constants';
import { me } from '@/services/user/me';

export default function useUser() {
    const [accessUser, setAccessUser] = useState<User | null>(retrieveUser())


    // const {refetch: fetchUser, isLoading: isUserLoading} = useQuery([reactQueryKeys.users.me], ()=> me(), {
    //     enabled: false,
    //     onSuccess(data){

    //     }
    // })

    const setUser = (user: User): void => {
        if (user) {
            storeUser(user)
        }
    }

    const clearUserData = (): void => {
        removeUser()
    }

    // const revalidateUser = () => {
    //     fetchUser()
    // }

    return {
        user: retrieveUser(),
        setUser,
        clearUserData,
        // revalidateUser,
        // isUserLoading
    }
}