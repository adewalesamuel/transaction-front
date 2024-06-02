import { TransactionEntity } from '@/entities/TransactionEntity';
import { Api } from './Api';

const ENDPOINT = '/transactions';

const getAll = (params: any, signal: AbortSignal): Promise<TransactionEntity[] | TransactionEntity> => {
    return Api.get(`${ENDPOINT}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<TransactionEntity[] | TransactionEntity> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<TransactionEntity>  => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id: number, payload: string, signal: AbortSignal): Promise<TransactionEntity> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<TransactionEntity> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const TransactionService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy
}