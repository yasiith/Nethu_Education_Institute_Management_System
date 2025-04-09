import Footer from "@components/footer";
import QuizResultPage from "@components/Student/quizzes/QuizResultPage";
import Navbar from "@components/Student/StudentNavbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <QuizResultPage />
      <Footer />
    </div>
  );
};

export default page;