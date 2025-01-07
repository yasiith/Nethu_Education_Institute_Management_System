import React from 'react';
import Navbar from '@components/Student/Navbar';
import Footer from '@components/footer';
import ClassDetails from '@components/Student/class-details/ClassDetails';

const page = () => {
  return (
    <div>
      <Navbar />
      <ClassDetails />  {/* Reusable ClassDetails component */}
      <Footer />
    </div>
  );
};

export default page;
