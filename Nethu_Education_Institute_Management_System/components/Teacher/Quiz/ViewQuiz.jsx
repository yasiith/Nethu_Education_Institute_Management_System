import React from 'react';

const ViewQuizPage = () => {
  // Sample data for testing the layout. Replace with dynamic data when backend is integrated.
  const quiz = {
    title: 'Sample Quiz Title',
    description: 'This is a sample description for the quiz.',
    questions: [
      {
        questionText: 'What is the capital of France?',
        choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris'
      },
      {
        questionText: 'Who developed the theory of relativity?',
        choices: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
        correctAnswer: 'Albert Einstein'
      },
      {
        questionText: 'What is the largest planet in our solar system?',
        choices: ['Earth', 'Jupiter', 'Saturn', 'Mars'],
        correctAnswer: 'Jupiter'
      }
    ]
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        {/* Quiz Title */}
        <h1 className="text-3xl font-semibold text-left text-gray-900 mb-6">{quiz.title}</h1>

        {/* Quiz Description */}
        <p className="text-lg text-gray-700 mb-8 text-left">{quiz.description}</p>

        {/* Questions and Answers */}
        <div className="space-y-6">
          {quiz.questions.map((q, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-medium text-gray-800 mb-4">{`Q${index + 1}: ${q.questionText}`}</h2>

              {/* Multiple Choice Answers */}
              <div className="space-y-4">
                {q.choices.map((choice, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <input 
                      type="radio" 
                      id={`q${index}-choice${idx}`} 
                      name={`q${index}`} 
                      value={choice} 
                      disabled 
                      checked={choice === q.correctAnswer} 
                      className="h-5 w-5 text-indigo-500"
                    />
                    <label 
                      htmlFor={`q${index}-choice${idx}`} 
                      className={`text-lg ${choice === q.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-700'}`}
                    >
                      {choice}
                    </label>
                  </div>
                ))}
              </div>

              {/* Correct Answer Highlight */}
              <p className="mt-4 text-green-600 font-medium">Correct Answer: {q.correctAnswer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewQuizPage;
