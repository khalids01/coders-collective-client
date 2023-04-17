import { useUser, useToken } from '@/hooks';
import {useState, useEffect} from 'react'

const useAdmin = () => {
    const {setUser, clearUserData, user} = useUser()
    const {clearToken, setToken} = useToken()
    
    const login = () => {
        
    }


    return{
        admin: user
        
    }
}


export default useAdmin;