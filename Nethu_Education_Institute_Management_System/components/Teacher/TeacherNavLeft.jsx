import React from "react";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-900 flex flex-col items-center p-4">
      {/* Logo and User Section */}
      <div className="text-white text-center mb-8 mt-4">
        <h1 className="text-2xl font-bold mb-4">NEIMS</h1>
        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
        <p className="text-sm">MR. Yasith</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 w-full">
        {[1, 2, 3].map((item) => (
          <button
            key={item}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            CLASSES
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto mb-8 w-full">
        <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
          <LogOut size={18} />
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
