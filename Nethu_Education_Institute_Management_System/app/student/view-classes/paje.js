import Footer from "@components/footer";
import Dashboard from "@components/Student/view-classes/Dashboard";
import Navbar from "@components/Student/StudentNavbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default page;