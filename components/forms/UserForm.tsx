import { UserFormProps } from '@/types';
import { String } from '../../utils/String';

export function UserForm(props: UserFormProps) {
    const {__} = String;

    return (
        <form onSubmit={e => props.handleFormSubmit(e)} className='max-w-2xl mt-3'>
            <div className='flex flex-wrap'>
                <div className='w-full'>
                    <div className='p-3'>
                        <label htmlFor='name' className='block'>{__('name')}</label>
                        <input className='border border-1 bg-white px-3 py-2 
                        rounded-sm w-full' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useUser.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setName(e.target.value)}/>
                    </div>
                </div>
				<div className='w-full'>
                    <div className='p-3'>
                        <label htmlFor='email' className='block'>{__('email')}</label>
                        <input className='border border-1 bg-white px-3 py-2 
                        rounded-sm w-full' type='mail' id='email' name='email' 
                        placeholder={__('email')} value={props.useUser.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setEmail(e.target.value)}/>
                    </div>
                </div>
				<div className='w-full'>
                    <div className='p-3'>
                        <label htmlFor='password' className='block'>{__('password')}</label>
                        <input className='border border-1 bg-white px-3 py-2 
                        rounded-sm w-full' type='password' id='password' name='password' 
                        placeholder={__('password')} value={props.useUser.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setPassword(e.target.value)}/>
                    </div>
                </div>
				
                <div className='w-full text-right'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='px-5 py-3 bg-blue-700 text-white rounded-md mt-5'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}