//Nethu_Education_Institute_Management_System\app\teachers\classes\[classId]\quizzes\quiz-create\page.js

import Footer from '@components/footer'
import QuizCreatePage from '@components/Teacher/Quiz/QuizCreatePage'
import QuizNav from '@components/Teacher/Quiz/QuizNav'
import React from 'react'

const page = () => {
  return (
    <div>
      <QuizNav />
      <QuizCreatePage />
      <Footer />
    </div>
  )
}

export default page
