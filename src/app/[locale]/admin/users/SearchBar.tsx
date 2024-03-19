'use client'

import React, { useState, useEffect } from 'react';
import { filterUsers } from '@/actions/actions';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchSchema } from '@/utils/forms/validationSchemas';
import Link from 'next/link';

type Input = z.infer<typeof searchSchema>;

export default function SearchBar() {
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Input>({
        resolver: zodResolver(searchSchema)
    });
    
    const processForm: SubmitHandler<Input> = async data => {
        setSearchTerm(data.search);
     };

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.trim() !== '') {
                setSearching(true);
                const response = await filterUsers({ search: searchTerm });
                const users = response.value; 
                setFilteredUsers(users);
                setSearching(false);
            } else {
                setFilteredUsers([]);
            }
        };

        fetchData();
    }, [searchTerm]);
     
    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit(processForm)} className="search-form">
                <input
                    {...register('search')}
                    type="text"
                    className="search-input"
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searching ? (
                    <button type="button" className="search-button disabled" disabled>
                        Searching...
                    </button>
                ) : (
                    <button type="submit" className="search-button"></button>
                )}
            </form>
            <div className="search-results">
                {filteredUsers.length > 0 ? (
                    <ul>
                        {filteredUsers.map((user) => (
                            <li style={{ cursor: 'pointer' }} className="search-result">
                                <Link href={`users/user?userId=${user.id}`}>
                                    <p>{user.displayName}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results-message">No users found.</p>
                )}
            </div>
        </div>
    );
}
