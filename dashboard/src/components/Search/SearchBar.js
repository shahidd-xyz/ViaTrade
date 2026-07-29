import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative w-full">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
            />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search stocks..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#2D6A4F]"
            />
        </div>
    );
};

export default SearchBar;