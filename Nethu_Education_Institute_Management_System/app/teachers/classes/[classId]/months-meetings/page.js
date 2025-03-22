'use client';

import ClassMonths from '@components/Teacher/ClassMonthsforMeeting'
import SidebarLeft from '@components/Teacher/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div>
      <SidebarLeft />
      <ClassMonths />
    </div>
  )
}

export default page