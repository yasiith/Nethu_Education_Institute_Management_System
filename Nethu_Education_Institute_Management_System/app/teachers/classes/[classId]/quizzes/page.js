'use client'
import Footer from '@components/footer'
import CreatedQuizCard from '@components/Teacher/Quiz/CreatedQuizCard'
import CreateNewQuizBtn from '@components/Teacher/Quiz/CreateNewQuizBtn'
import DeleteQuizCard from '@components/Teacher/Quiz/DeleteQuizCard'
import QuizNav from '@components/Teacher/Quiz/QuizNav'
import React from 'react'

const Page = () => {
  return (
    <div>
      <QuizNav />
      <CreatedQuizCard />
      <CreateNewQuizBtn />
      <DeleteQuizCard /> {/* make this component only visible when there is a quiz */}
      <Footer />
    </div>
  )
}

export default Page
