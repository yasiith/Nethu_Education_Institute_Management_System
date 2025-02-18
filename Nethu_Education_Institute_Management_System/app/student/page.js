import Footer from "@components/footer";
import Dashboard from "@components/Student/Dashboard";
import Navbar from "@components/Student/StudentNavbar";
import React from "react";

import Dashboard1 from "@components/Student/view-classes/Dashboard";

const studentDashboard = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default studentDashboard;
