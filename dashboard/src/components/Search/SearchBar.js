import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="mt-3">
      <div className="w-full">
        <Search
          className="text-gray-400"
          size={28}
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search stocks..."
          className="w-full rounded-3 border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#2D6A4F] ms-3 ps-3"
          style={{width: "90%"}}
        />
      </div>
    </div>
  );
};

export default SearchBar;
