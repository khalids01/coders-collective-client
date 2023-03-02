import { endpoints } from '../../constants'
import api from '../api'


const signupService = async (formData: any) => {
    const res = await api.post(endpoints.server.auth.signup, formData)
    return res;
}


export default signupService;