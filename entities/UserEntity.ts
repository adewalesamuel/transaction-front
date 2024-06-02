export interface UserEntity {
    id?: number,
    name: string,
    email: string,
    password?: string,
    createdAt?: string,
    updatedAt?: string,
    access_token?: string
}