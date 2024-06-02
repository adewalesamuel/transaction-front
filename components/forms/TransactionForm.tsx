import { TransactionFormProps } from '@/types';
import { String } from '../../utils/String';

export function TransactionForm(props: TransactionFormProps) {
    const {__} = String;

    return (
        <form onSubmit={props.handleFormSubmit} className='max-w-2xl mt-3'>
            <div className='flex flex-wrap'>
                <div className='w-full'>
                    <div className='p-3'>
                        <label className="block" htmlFor='number'>{__('number')}</label>
                        <input className='border border-1 bg-white px-3 py-2 
                        rounded-sm w-full' type='text' id='number' name='number' 
                        placeholder={__('number')} value={props.useTransaction.number ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useTransaction.setNumber(e.target.value)}/>
                    </div>
                </div>
				<div className='w-full'>
                    <div className='p-3'>
                        <label className="block" htmlFor='date'>{__('date')}</label>
                        <input className='border border-1 bg-white px-3 py-2 
                        rounded-sm w-full' type='date' id='date' name='date' 
                        placeholder={__('date')} value={props.useTransaction.date.toString() ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useTransaction.setDate(e.target.value)}/>
                    </div>
                </div>
				<div className='w-full'>
                    <div className='p-3'>
                        <label className="block" htmlFor='amount'>{__('amount')}</label>
                        <input className='border border-1 bg-white px-3 py-2 
                        rounded-sm w-full' type='number' id='amount' name='amount' 
                        placeholder={__('amount')} value={props.useTransaction.amount ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useTransaction.setAmount(Number(e.target.value))}/>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='p-3'>
                        <label className="block" htmlFor='amount'>{__('users')}</label>
                        <select className='border border-1 bg-white px-3 py-2 
                        rounded-sm w-full' value={props.useTransaction.userId}
                        disabled={props.isDisabled} onChange={(e) => 
                        props.useTransaction.setUserId(Number(e.target.value))}>
                            <option hidden>Choisissez une option</option>
                            {props.users.map((user, index) => {
                                return (
                                    <option key={index} value={user.id}>
                                        {user.name}
                                    </option>
                                )
                            })}
                        </select>
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