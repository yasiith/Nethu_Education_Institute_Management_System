'use client'
import Footer from '@components/footer'
import QuizzesList from '@components/Teacher/Quiz/QuizzesList'
import CreateNewQuizBtn from '@components/Teacher/Quiz/CreateNewQuizBtn'
import DeleteQuizCard from '@components/Teacher/Quiz/DeleteQuizCard'
import QuizNav from '@components/Teacher/Quiz/QuizNav'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [hasQuizzes, setHasQuizzes] = useState(false);
  
  return (
    <div>
      <QuizNav />
      <QuizzesList />
      <CreateNewQuizBtn />
      {hasQuizzes && <DeleteQuizCard />} {/* DeleteQuizCard will only show when there are quizzes */}
      <Footer />
    </div>
  )
}

export default Page