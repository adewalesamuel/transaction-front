'use client'
import { LoginForm } from '@/components/forms/LoginForm';
import { UserForm } from '@/components/forms/UserForm';
import { Hooks } from '@/hooks';
import { AuthService } from '@/services/AuthService';
import { Auth } from '@/utils/Auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginView() {
    let abortController = new AbortController();

    const router = useRouter();
    const useUser = Hooks.useUser();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            const payload = {email, password};

            const user = await AuthService.login(
                JSON.stringify(payload), 
                abortController.signal);

            const {access_token} = user;

            Auth.setUser(user);
            Auth.setSessionToken(access_token as string);
            
            alert('Vous être connecté avec succes');
            router.push('/transactions');
        } catch (error: any) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;
            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            setIsDisabled(false);
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
            <LoginForm email={email} setEmail={setEmail} password={password}
            setPassword={setPassword} isDisabled={isDisabled} 
            handleFormSubmit={handleFormSubmit} />
            <Link href={'/register'} className='text-blue-800 p-3 font-bold'>
                Inscription
            </Link>
        </div>
    )
}
