"use client";

import queryString from "query-string";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

const Search = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = {
      searchQuery: text,
    };
    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <form
      className="flex flex-row border border-neutral-700 rounded-full overflow-hidden w-2/5"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search..."
        className=" w-full px-4 py-2 bg-neutral-900"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        type="submit"
        title="Search-button"
        className="bg-neutral-800 border-hidden px-3 cursor-pointer"
      >
        <MdOutlineSearch className=" w-6 h-6" />
      </button>
    </form>
  );
};

export default Search;
