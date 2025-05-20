"use client"; // Mark this as a client component

import "@styles/globals.css";
import Chatbot from '@components/Chatbot';
import { usePathname } from 'next/navigation';

const Rootlayout = ({ children }) => {
  const pathname = usePathname();

  // Define the paths where the Chatbot should NOT be rendered
  const excludedPaths = ['/Login', '/' ]; // Add other paths as needed

  // Check if the current pathname is in the excludedPaths array
  const shouldShowChatbot = !excludedPaths.includes(pathname);

  return (
    <html lang="en">
      <body>
        <div>
          {/* Your page content */}
        </div>
        <main>{children}</main>
        {/* Conditionally render the Chatbot */}
        {shouldShowChatbot && <Chatbot />}
      </body>
    </html>
  );
};

export default Rootlayout;
