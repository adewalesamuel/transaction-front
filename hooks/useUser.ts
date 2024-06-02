import { useState } from 'react';
import { Services } from '../services';
import { UserEntity } from '@/entities/UserEntity';
import { useUserT } from '@/types';

export const useUser = (): useUserT => {
    const [id, setId] = useState<number|''>('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getUser = (userId: number, signal: AbortSignal): Promise<UserEntity[] | UserEntity> => {        
        return Services.UserService.getById(userId, signal)
        .then((response: any) => {
            fillUser(response);
            setIsDisabled(false);

            return response;
        });
    }

    const createUser = (signal: AbortSignal): Promise<UserEntity> => {
        const payload = {
            name,
            email,
            password,
		
        };

        return Services.UserService.create(
        JSON.stringify(payload), signal);
    }
    const updateUser = (userId: number, signal: AbortSignal): Promise<UserEntity> => {
        const payload = {
            name,
            email,
            password,
		
        };

        return Services.UserService.update(
        	userId, JSON.stringify(payload), signal);
    }
    const deleteUser = (userId: number, signal: AbortSignal): Promise<UserEntity> => {
        return Services.UserService.destroy(userId, signal);
    }
    const fillUser = (user: UserEntity) => {
        setId(user.id ?? '');
        setName(user.name ?? '');
		setEmail(user.email ?? '');
		setPassword(user.password ?? '');
		
    }
    const emptyUser = () => {
        setId('');
        setName('');
		setEmail('');
		setPassword('');
		
    }

    return {
        id,
        name,
		email,
		password,
		
        errors,
        isDisabled,
        setName,
		setEmail,
		setPassword,
		
        setId,
        setErrors,
        setIsDisabled,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        fillUser,
        emptyUser
    };
}