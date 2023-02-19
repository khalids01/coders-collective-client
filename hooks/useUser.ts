import { useState, useEffect } from "react";
import { User } from "../types";
import { storeUser, retrieveUser, removeUser } from '../utils/userStore'

export default function useUser() {
    const [accessUser, setAccessUser] = useState<User | null>(null)

    useEffect(() => {
        const user = retrieveUser()
        setAccessUser(user)
    }, [])

    const setUser = (user: User): void => {
        if (user) {
            storeUser(user)
        }
    }

    const clearUserData = (): void => {
        removeUser()
    }

    const revalidateUser = (): void => { }

    return {
        user: accessUser,
        setUser,
        clearUserData
    }
}