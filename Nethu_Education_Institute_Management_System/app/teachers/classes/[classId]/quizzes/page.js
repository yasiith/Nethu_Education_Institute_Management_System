'use client'
import Footer from '@components/footer'
import CreatedQuizCard from '@components/Teacher/Quiz/CreatedQuizCard'
import CreateNewQuizBtn from '@components/Teacher/Quiz/CreateNewQuizBtn'
import QuizNav from '@components/Teacher/Quiz/QuizNav'
import React from 'react'

const Page = () => {
  return (
    <div>
      <QuizNav />
      <CreatedQuizCard />
      <CreateNewQuizBtn />
      <Footer />
    </div>
  )
}

export default Page
