import { UserEntity } from "@/entities/UserEntity";

const localStorage = typeof window !== 'undefined' ? 
window.localStorage : {getItem: () => null, setItem: () => null, 
removeItem: () => null};
const tokenName = 'utk';
const userName = 'user'

const getSessionToken = () => {
    return localStorage?.getItem(tokenName) ?? null;
}

const isLoggedIn = () => {
    if (getSessionToken() === '' || !getSessionToken())
        return false;

    return true;
}

const setSessionToken = (token: string) => {
    localStorage?.setItem(tokenName, token)
}

const setUser = (user: UserEntity) => {
    localStorage?.setItem(userName, JSON.stringify(user))
}

const removeSessionToken = () => {
    localStorage?.removeItem(tokenName);
    localStorage?.removeItem(userName);
}

const getUser = () => {
    return {
        ...JSON.parse(localStorage?.getItem(userName) ?? '{}')
    }
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken,
    removeSessionToken,
    getUser,
    setUser
}
