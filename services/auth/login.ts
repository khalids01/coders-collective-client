import type { LoginRequest } from '../../types'
import { endpoints } from '../../constants'
import api from '../api'

const loginService = ({ email, password }: LoginRequest) => {
    const res = api.post(endpoints.server.auth.login, { email, password })
    return res;
}


export default loginService;