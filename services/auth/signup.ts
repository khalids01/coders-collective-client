import { SignupRequest } from '@/types';
import { endpoints } from '@/constants'
import api from '@/services/api'


const signupService = async (data: SignupRequest) => {
    const res = await api.post(endpoints.server.auth.signup, data)
    return res;
}


export default signupService;