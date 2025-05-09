import React from 'react';

// Export the Footer component with consistent casing
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Nethu Education</h3>
            <p className="mb-4">Providing quality education since 2010.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>Email: info@nethueducation.com</p>
            <p>Phone: +94 77 123 4567</p>
            <p>Address: 123 Education St, Colombo</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">Facebook</a>
              <a href="#" className="hover:text-gray-400">Twitter</a>
              <a href="#" className="hover:text-gray-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p>© {new Date().getFullYear()} Nethu Education Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
