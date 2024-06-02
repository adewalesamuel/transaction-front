import { UserEntity } from '@/entities/UserEntity';
import { Api } from './Api';

const ENDPOINT = '/users';

const getAll = (params: any, signal: AbortSignal): Promise<UserEntity[] | UserEntity> => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<UserEntity[] | UserEntity> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<UserEntity>  => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id: number, payload: string, signal: AbortSignal): Promise<UserEntity> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<UserEntity> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const UserService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy
}