import { FormEvent, PropsWithChildren } from "react"
import { TransactionEntity } from "./entities/TransactionEntity"
import { UserEntity } from "./entities/UserEntity"

export type useUserT = {
    id: number | '',
    name: string,
    email: string,
    password: string,
    
    errors: string[],
    isDisabled: boolean,
    setName: (name: string) => void,
    setEmail: (name: string) => void,
    setPassword: (name: string) => void,
    
    setId: (id: number) => void,
    setErrors: (errors: never[]) => void,
    setIsDisabled: (bool: boolean) => void,
    getUser:  (userId: number, signal: AbortSignal) => Promise<UserEntity[] | UserEntity>,
    createUser: (signal: AbortSignal) => Promise<UserEntity>,
    updateUser: (userId: number, signal: AbortSignal) => Promise<UserEntity>,
    deleteUser: (userId: number, signal: AbortSignal) => Promise<UserEntity>,
    fillUser: (user: UserEntity) => void,
    emptyUser: () => void
}

export type useTransactionT = {
    id: number | '',
    number: string,
    date: string | '',
    amount: number | '',
    userId: number | '',    
    errors: string[],
    isDisabled: boolean,
    setNumber: (name: string) => void,
    setDate: (date: string) => void,
    setAmount: (amount: number) => void,
    setUserId: (userId: number) => void,    

    setId: (id: number) => void,
    setErrors: (errors: never[]) => void,
    setIsDisabled: (bool: boolean) => void,
    getTransaction:  (userId: number, signal: AbortSignal) => Promise<TransactionEntity[] | TransactionEntity>,
    createTransaction: (signal: AbortSignal) => Promise<TransactionEntity>,
    updateTransaction: (userId: number, signal: AbortSignal) => Promise<TransactionEntity>,
    deleteTransaction: (userId: number, signal: AbortSignal) => Promise<TransactionEntity>,
    fillTransaction: (user: TransactionEntity) => void,
    emptyTransaction: () => void
}

export type BaseFormProps = PropsWithChildren & {
    isDisabled: boolean,
    handleFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
}

export type TransactionFormProps = BaseFormProps & {
    useTransaction: useTransactionT,
    users: UserEntity[],
}

export type UserFormProps = BaseFormProps & {
    useUser: useUserT,
}

export type LoginFormProps = BaseFormProps & {
    email: string,
    password: string,
    setEmail: (value: string) => void,
    setPassword: (value: string) => void,
} 