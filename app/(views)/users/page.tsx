'use client';
import { useCallback, useEffect, useState } from 'react';
import { Services } from '@/services';
import { UserEntity } from '@/entities/UserEntity';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserListView() {
    let abortController = new AbortController();

    const router = useRouter();

    const { UserService } = Services;

    const [users, setUsers] = useState<UserEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e: any, data: UserEntity) => {
        router.push(`/users/edit?id=${data.id}`)
    }

    const init = useCallback(async () => {
        try {
            const users = await UserService.getAll(
                {}, abortController.signal);

            setUsers(users as UserEntity[]);
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
            <h1 className='text-2xl'>Liste des Utilisateurs</h1>
            <Link href={'/transactions'} className='text-blue-800 px-3 py-2 font-bold mt-2'>
                Liste des transactions
            </Link>
            <div className="overflow-auto mt-5">
                <table className='border-1 border'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border border-1 p-2">{user.name}</td>
                                    <td className="border border-1 p-2">{user.email}</td>
                                    <td className="border border-1 p-2">{user.createdAt}</td>
                                    <td className="border border-1 p-2">{user.updatedAt}</td>
                                    <td className="border border-1 p-2">
                                        <button className='bg-cyan-500 text-white p-2' 
                                        onClick={(e) => handleEditClick(e, user)}>
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
