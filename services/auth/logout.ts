import { endpoints } from '../../constants'
import api from '../api'


const logoutService = () => {
    const res = api.get(endpoints.server.auth.logout)
    return res;
}


export default logoutService;