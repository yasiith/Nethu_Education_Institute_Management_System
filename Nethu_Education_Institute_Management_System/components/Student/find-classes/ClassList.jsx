import React from 'react'

const ClassList = ({classes}) => {
  return (
    <div>
      {classes.length > 0 ? (
        classes.map((cls) => (
            <div>
                <h2>{cls.name}</h2>
                <p>Grade: {cls.grade}</p>
                <p>Subject: {cls.subject}</p>
            </div>
        ))
        ) : (
            <h1>No classes found</h1>
      )}
    </div>
  )
}

export default ClassList
