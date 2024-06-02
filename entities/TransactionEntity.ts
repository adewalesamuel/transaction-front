export interface TransactionEntity {
    id?: number,
    number: string,
    date: string,
    amount: number,
    userId: number
    createdAt?: string,
    updatedAt?: string
}