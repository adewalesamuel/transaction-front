import { UserEntity } from '@/entities/UserEntity';
import { Api } from './Api';

const ENDPOINT = '/auth'

const register = (payload: string, signal: AbortSignal): Promise<UserEntity>  => {
    return Api.post(`${ENDPOINT}/register`, payload, signal)
}
const login = (payload: string, signal: AbortSignal): Promise<UserEntity>  => {
    return Api.post(`${ENDPOINT}/login`, payload, signal)
}

export const AuthService = {
    login,
    register,
}