'use client'
import { TransactionEntity } from '@/entities/TransactionEntity';
import { Services } from '@/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function TransactionListView() {
    let abortController = new AbortController();

    const router = useRouter();

    const { TransactionService } = Services;

    const [transactions, setTransactions] = useState<TransactionEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e: any, data: TransactionEntity) => {
        router.push(`/transactions/edit?id=${data.id}`)
    }

    const init = useCallback(async () => {
        try {
            const transactions = await TransactionService.getAll(
                {}, abortController.signal);

            setTransactions(transactions as TransactionEntity[]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <div className='flex flex-col p-5 items-start'>
            <h1 className='text-2xl'>Liste des transactions</h1>
            <Link href={'/transactions/create'} className='text-white
            bg-blue-800 px-3 py-2 font-bold mt-2'>
                Créer une transaction
            </Link>
            <Link href={'/users'} className='text-blue-800 px-3 py-2 font-bold mt-2'>
                Liste des utilisateurs
            </Link>
            <div className="overflow-auto mt-5">
                <table className='border-1 border'>
                    <thead>
                        <tr>
                            <th>number</th>
                            <th>date</th>
                            <th>amount</th>
                            <th>userId</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border border-1 p-2">{transaction.number}</td>
                                    <td className="border border-1 p-2">{transaction.date}</td>
                                    <td className="border border-1 p-2">{transaction.amount}</td>
                                    <td className="border border-1 p-2">{transaction.userId}</td>
                                    <td className="border border-1 p-2">{transaction.createdAt}</td>
                                    <td className="border border-1 p-2">{transaction.updatedAt}</td>
                                    <td className="border border-1 p-2">
                                        <button className='bg-cyan-500 text-white p-2' 
                                        onClick={(e) => handleEditClick(e, transaction)}>
                                            Modifier
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
