
import Footer from '@components/footer'
import Avatar from '@components/Teacher/my-profile/NameCard'
import NavToDashboard from '@components/Teacher/my-profile/NavToDashboard'

import React from 'react'

const Page = () => {
  return (
    <div>
      <NavToDashboard />
      <Avatar />
      <Footer />
    </div>
  )
}

export default Page
