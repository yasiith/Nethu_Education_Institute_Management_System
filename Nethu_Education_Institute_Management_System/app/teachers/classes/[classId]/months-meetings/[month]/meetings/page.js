import Footer from '@components/footer'
import QuizCreatePage from '@components/Teacher/Meeting/MeetingCreatePage'
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