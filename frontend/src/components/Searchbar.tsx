import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface SearchbarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}) => {
  return (
    <div className="w-100 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search"
        className="w-full text-s bg-transparent py-[10px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-l text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}
      <FaSearch
        className="text-slate-500 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
