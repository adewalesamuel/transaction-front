'use client'
import { UserForm } from '@/components/forms/UserForm';
import { Hooks } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';

export default function UserEditView() {
    let abortController = new AbortController();

    const searchParams = useSearchParams();

    const useUser = Hooks.useUser();

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        useUser.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useUser.updateUser(
            	Number(searchParams.get('id')), abortController.signal);
        } catch (error: any) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useUser.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
            await useUser.getUser(Number(searchParams.get('id')), 
                abortController.signal);
        } catch (error) {
            console.log(error);
        } finally{
            useUser.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <div className='flex flex-col p-5 items-start'>
            <h1 className='text-3xl'>Modifer l&apos;utilisateur</h1>
            {errorMessages.map((errorItem, index) => {
                return (
                    <div className='px-3 py-2 bg-red-200 
                    text-red-700 rounded-sm my-1' key={index}>
                        {errorItem}
                    </div>
                )
            })}
            <UserForm useUser={useUser} isDisabled={useUser.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </div>
    )
}
