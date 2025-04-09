import React from 'react';
import { Search } from 'lucide-react';

const SearchBtn = () => (
  <button className="bg-blue-950 text-white px-8 py-2 rounded-md flex items-center gap-2 hover:bg-gray-300 hover:text-blue-950 transition-all duration-300 font-semibold text-l">
    <Search size={18} />
    Search
  </button>
);

export default SearchBtn;
