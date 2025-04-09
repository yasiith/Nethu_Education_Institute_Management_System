import Footer from "@components/footer";
import QuizeAttemptPage from "@components/Student/quizzes/QuizeAttemptPage";
import Navbar from "@components/Student/StudentNavbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <QuizeAttemptPage />
      <Footer />
    </div>
  );
};

export default page;