import Footer from "@components/footer";
import Dashboard from "@components/Student/Dashboard";
import Navbar from "@components/Student/StudentNavbar";
import React from "react";
import ClientOnly from '../../components/ClientOnly';

// Client component that uses localStorage
const StudentDashboardClient = () => {
  'use client';
  // Your existing code that uses localStorage
  // ...existing code...
  
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
};

// Server component that safely renders the client component
const StudentDashboard = () => {
  return (
    <ClientOnly>
      <StudentDashboardClient />
    </ClientOnly>
  );
};

export default StudentDashboard;
