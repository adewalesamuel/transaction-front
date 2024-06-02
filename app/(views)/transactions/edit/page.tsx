'use client'
import { TransactionForm } from '@/components/forms/TransactionForm';
import { UserEntity } from '@/entities/UserEntity';
import { Hooks } from '@/hooks';
import { Services } from '@/services';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';

export default function TransactionEditView() {
    let abortController = new AbortController();

    const searcParams = useSearchParams();

    const useTransaction = Hooks.useTransaction();

    const [users, setUsers] = useState<UserEntity[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        useTransaction.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useTransaction.updateTransaction(
            	Number(searcParams.get('id')), abortController.signal);
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
            await useTransaction.getTransaction(Number(searcParams.get('id')), 
            abortController.signal);

            const users = await Services.UserService.getAll(
                {}, abortController.signal);
            
            setUsers(users as UserEntity[]);
        } catch (error) {
            console.log(error);
        } finally{
            useTransaction.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <div className='flex flex-col p-5 items-start'>
            <h1 className='text-3xl'>Modifer la transaction</h1>
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
