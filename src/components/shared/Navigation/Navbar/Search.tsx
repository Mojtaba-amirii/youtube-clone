"use client";

import { MdOutlineSearch } from "react-icons/md";
import { useState } from "react";

const Search = () => {
  const [text, setText] = useState("");

  return (
    <form className="flex flex-row border border-neutral-700 rounded-full overflow-hidden w-2/5">
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
        className="bg-neutral-800 border-hidden px-3"
      >
        <MdOutlineSearch className=" w-6 h-6" />
      </button>
    </form>
  );
};

export default Search;
