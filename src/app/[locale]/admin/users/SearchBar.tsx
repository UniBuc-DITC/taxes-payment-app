"use client";

import React, { useState, useEffect } from "react";
import { filterUsers } from "@/actions/actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchSchema } from "@/utils/forms/validationSchemas";
import Link from "next/link";
import { debounce } from 'lodash';

type Input = z.infer<typeof searchSchema>;

export default function SearchBar() {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(searchSchema),
  });

  const processForm: SubmitHandler<Input> = async (data) => {
    setSearchTerm(data.search);
  };

  useEffect(() => {
    const fetchData = debounce(async () => {
      if (searchTerm.trim() !== "") {
        setSearching(true);
        const response = await filterUsers({ search: searchTerm });
        const users = response.value.slice(0, 10);
        setFilteredUsers(users);
        setSearching(false);
      } else {
        setFilteredUsers([]);
      }
    }, 500);

    fetchData();
  }, [searchTerm]);

  return (
    <div className="search-bar-container flex flex-col items-center w-full">
      <div className="search-form-container w-full mb-4">
        <form
          onSubmit={handleSubmit(processForm)}
          className="search-form flex items-center justify-between w-full px-4"
        >
          <input
            {...register("search")}
            type="text"
            className="search-input flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="search-button ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
      <div className="search-results-container w-full shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
        {searching ? (
          <p className="searching-message px-4 py-2">Searching...</p>
        ) : filteredUsers.length > 0 ? (
          <ul className="search-results-list">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="search-result-item px-4 py-2 border-b border-gray-200"
              >
                <Link href={`users/user?userId=${user.id}`}>
                  <p className="text-blue-500 hover:text-blue-700">
                    {user.displayName}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results-message px-4 py-2">No users found.</p>
        )}
      </div>
    </div>
  );
}
