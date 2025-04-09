'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import UploadPage from '@components/Teacher/material/Uploadpage';
import Sidebar from '@components/Teacher/Sidebar';

const Page = () => {
  const pathname = usePathname(); // Get current pathname
  const [classId, setClassId] = useState(null);

  useEffect(() => {
    // Extract classId from pathname, assuming it's in the format /teachers/classes/[classId]/materials
    const classIdFromPath = pathname?.split('/')[3]; // This will grab the [classId] part from the URL
    if (classIdFromPath) {
      setClassId(classIdFromPath);
    }
  }, [pathname]);

  // Render the component only when classId is available
  if (!classId) {
    return <div>Loading...</div>; // or handle loading state
  }

  return (
    <div>
      <Sidebar />
      {/* Pass classId to UploadPage as a prop */}
      <UploadPage classId={classId} />
    </div>
  );
};

export default Page;
