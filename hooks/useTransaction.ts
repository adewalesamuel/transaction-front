import { useState } from 'react';
import { Services } from '../services';
import { TransactionEntity } from '@/entities/TransactionEntity';
import { useTransactionT } from '@/types';

export const useTransaction = (): useTransactionT => {
    const [id, setId] = useState<number|''>('');
	const [number, setNumber] = useState('');
	const [date, setDate] = useState<string|''>('');
	const [amount, setAmount] = useState<number|''>('');
	const [userId, setUserId] = useState<number|''>('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getTransaction = (
        transactionId: number, 
        signal: AbortSignal): Promise<TransactionEntity[] | TransactionEntity> => {        
        return Services.TransactionService.getById(transactionId, signal)
        .then((response: any) => {
            fillTransaction(response);
            setIsDisabled(false);

            return response;
        });
    }

    const createTransaction = (signal: AbortSignal) => {
        const payload = {
            number,
            date,
            amount,
            userId,
		
        };

        return Services.TransactionService.create(
        JSON.stringify(payload), signal);
    }
    const updateTransaction = (
        transactionId: number, 
        signal: AbortSignal): Promise<TransactionEntity> => {
        const payload = {
            number,
            date,
            amount,
            userId,
		
        };

        return Services.TransactionService.update(
        	transactionId, JSON.stringify(payload), signal);
    }
    const deleteTransaction = (
        transactionId: number, 
        signal: AbortSignal): Promise<TransactionEntity> => {
        return Services.TransactionService.destroy(transactionId, signal);
    }
    const fillTransaction = (transaction: TransactionEntity) => {
        setId(transaction.id ?? '');
        setNumber(transaction.number ?? '');
		setDate(transaction.date ?? '');
		setAmount(transaction.amount ?? '');
		setUserId(transaction.userId ?? '');
		
    }
    const emptyTransaction = () => {
        setId('');
        setNumber('');
		setDate('');
		setAmount('');
		setUserId('');
		
    }

    return {
        id,
        number,
		date,
		amount,
		userId,
		
        errors,
        isDisabled,
        setNumber,
		setDate,
		setAmount,
		setUserId,
		
        setId,
        setErrors,
        setIsDisabled,
        getTransaction,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        fillTransaction,
        emptyTransaction
    };
}