'use client'
import { UserForm } from '@/components/forms/UserForm';
import { Hooks } from '@/hooks';
import { Auth } from '@/utils/Auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, use, useState } from 'react';

export default function UserCreateView() {
    let abortController = new AbortController();

    const router = useRouter();
    const useUser = Hooks.useUser();

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        useUser.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useUser.createUser(abortController.signal);
            
            alert('Vous être inscrit avec succes !. Veuillez vous connecter');
            router.push('/login');
        } catch (error: any) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;
            const messages = await error.messages;

            console.log(messages.join(''))
            setErrorMessages(messages);
        } finally {
            useUser.setIsDisabled(false);
        }
    }

    return (
        <div className='flex flex-col p-5 items-start'>
            <h1 className='text-3xl'>Inscription</h1>
            {errorMessages.map((errorItem, index) => {
                return (
                    <div className='px-3 py-2 bg-red-200 
                    text-red-700 rounded-sm my-1' key={index}>
                        {errorItem}
                    </div>
                )
            })}
            <UserForm useUser={useUser} 
            isDisabled={useUser.isDisabled} handleFormSubmit={handleFormSubmit}/>
            <Link href={'/login'} className='text-blue-800 p-3 font-bold'>
                Se connecter
            </Link>
        </div>
    )
}
