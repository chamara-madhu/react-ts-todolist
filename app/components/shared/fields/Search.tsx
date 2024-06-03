"use client";

import React, { ChangeEvent, useState } from "react";
import SearchIcon from "@/app/assets/icons/search.svg";
import { searchTasks } from "@/app/redux/features/taskSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKey(value);
    dispatch(searchTasks(value));
  };

  return (
    <div className="relative">
      <SearchIcon className="absolute z-10 top-[13px] left-[14px]" />
      <input
        value={searchKey}
        onChange={handleSearch}
        type="text"
        className="flex outline-none border text-base sm:text-sm placeholder-[#AAAAAA] items-center self-stretch justify-between w-full h-10 py-2 !pl-9 !pr-20 rounded-full md:p-4 bg-pp-gray-200 focus:border-purple-400"
        placeholder="Type and search..."
      />
    </div>
  );
};

export default Search;
