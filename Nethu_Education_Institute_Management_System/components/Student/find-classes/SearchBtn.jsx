import React from 'react';
import { Search } from 'lucide-react';

const SearchBtn = () => (
  <button className="bg-blue-500 text-white px-8 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 text-l">
    <Search size={18} />
    Search
  </button>
);

export default SearchBtn;
