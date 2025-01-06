import React from 'react'
import ViewQuiz from '@components/Teacher/Quiz/ViewQuiz'
import QuizNav from '@components/Teacher/Quiz/QuizNav'
import Footer from '@components/footer'

const page = () => {
  return (
    <div>
      <QuizNav />
      <ViewQuiz />
      <Footer />
    </div>
  )
}

export default page
