import Footer from '@components/footer'
import CreateNewQuizBtn from '@components/Teacher/Quiz/CreateNewQuizBtn'
import QuizNav from '@components/Teacher/Quiz/QuizNav'
import React from 'react'

const Page = () => {
  return (
    <div>
      <QuizNav />
      <CreateNewQuizBtn />
      <Footer />
      {/* footer component */}
    </div>
  )
}

export default Page
