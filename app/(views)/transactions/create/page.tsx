'use client'
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Hooks } from '@/hooks';
import { useRouter } from 'next/navigation';
import { TransactionForm } from '@/components/forms/TransactionForm';
import { Services } from '@/services';
import { UserEntity } from '@/entities/UserEntity';

export default function TransactionCreateView() {
    let abortController = new AbortController();

    const router = useRouter();

    const useTransaction = Hooks.useTransaction();
    
    const [users, setUsers] = useState<UserEntity[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {        
        e.preventDefault();
        useTransaction.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useTransaction.createTransaction(abortController.signal);

            router.push('/transactions');
        } catch (error: any) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useTransaction.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useTransaction.setIsDisabled(true);

        try {
            const users = await Services.UserService.getAll(
                {}, abortController.signal);
            
            setUsers(users as UserEntity[]);
        } catch (error) {
            console.log(error);
        } finally {
            useTransaction.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <div className='flex flex-col p-5 items-start'>
            <h1 className='text-3xl'>Créer une transaction</h1>
            {errorMessages.map((errorItem, index) => {
                return (
                    <div className='px-3 py-2 bg-red-200 
                    text-red-700 rounded-sm my-1' key={index}>
                        {errorItem}
                    </div>
                )
            })}
            <TransactionForm useTransaction={useTransaction}
            isDisabled={useTransaction.isDisabled} users={users}
            handleFormSubmit={handleFormSubmit}/>
        </div>
    )
}
