import { Auth } from "@/utils/Auth";


const HOST = 'http://127.0.0.1';
const PORT = '3000';
const URL = process.env.NEXT_APP_HOST_URL ?? `${HOST}:${PORT}`;
const ROOT_PATH  = '/api';
const abortController = new AbortController();
const getHeaders = () => {
    return (new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Authorization': `Bearer ${Auth.getSessionToken()}`
    }));
}
const getFormDataHeaders = () => {
    return (new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${Auth.getSessionToken()}`
    }));
}

const get = <T>(
    endpoint: string, 
    signal=abortController.signal): Promise<T[] | T> => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}${endpoint}`, {
            headers:getHeaders(),
            signal
        })
        .then((response: Response) => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then((result: T[]) => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const post = <T>(
    endpoint: string, 
    payload: string, 
    signal=abortController.signal): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}${endpoint}`,
        {
            method:'post', 
            headers:getHeaders(), 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}
const postFormData = <T>(
    endpoint: string, 
    payload: string, 
    signal=abortController.signal): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}${endpoint}`,
        {
            method:'post', 
            headers:getFormDataHeaders(), 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const put = <T>(
    endpoint: string, 
    payload: string, 
    signal=abortController.signal): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}${endpoint}`,
        {
            method:'put', 
            headers:getHeaders(), 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            } 

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const erase = <T>(
    endpoint: string, 
    signal=abortController.signal): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}${endpoint}`,
        {
            method:'delete', 
            headers:getHeaders(), 
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const getResponseErrors = (response: any) => {
    return new Promise((resolve, reject) => {
        if (!response) reject(null);
        
        response.json().then((result: any) => {
            let errorMessages = [];


            if (typeof result.message === 'string') {
                errorMessages.push(result.message)
            } else {
                for (let error of result.message) 
                    errorMessages.push(error);
            }
            
            resolve(errorMessages);
        });    
    })
}

export const Api = {
    get,
    post,
    put,
    erase,
    postFormData
}