'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const QuizCreatePage = () => {
  const pathname = usePathname(); // Access the current URL path
  const [classID, setClassID] = useState(''); // ClassID state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);

  // Extract ClassID from URL
  useEffect(() => {
    const pathSegments = pathname.split('/');
    const classIDFromURL = pathSegments[pathSegments.indexOf('classes') + 1];
    if (classIDFromURL) {
      setClassID(classIDFromURL);
    }
  }, [pathname]);

  useEffect(() => {
    setQuestionNumber(questions.length + 1);
  }, [questions]);

  const addQuestion = () => {
    if (currentQuestion.trim() && correctAnswer.trim()) {
      if (currentOptions.some(option => option.trim() === '')) {
        alert('Please fill out all options');
        return;
      }

      if (editingIndex !== null) {
        const updatedQuestions = questions.map((q, index) =>
          index === editingIndex
            ? {
                questionText: currentQuestion,
                options: currentOptions,
                correctAnswer: correctAnswer,
              }
            : q
        );
        setQuestions(updatedQuestions);
        setEditingIndex(null);
      } else {
        setQuestions([
          ...questions,
          {
            questionText: currentQuestion,
            options: currentOptions,
            correctAnswer: correctAnswer,
          },
        ]);
      }

      setCurrentQuestion('');
      setCurrentOptions(['', '', '', '']);
      setCorrectAnswer('');
    } else {
      alert('Please fill out all fields');
    }
  };

  const handleSave = async () => {
    if (title.trim() && questions.length > 0 && classID.trim()) {
      const quizData = {
        classID,
        title,
        description,
        questions,
        // Add the teacher's ID as createdBy
        createdBy: 'teacherUserID' // Replace 'teacherUserID' with the actual teacher ID from the JWT token
      };
  
      console.log('Sending quiz data:', quizData);
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not logged in. Please log in first.');
          return;
        }
  
        const response = await fetch('http://localhost:5000/api/quizzes/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(quizData),
        });
  
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || `Server returned ${response.status}: ${response.statusText}`);
        }
  
        alert('Quiz Created Successfully!');
        setTitle('');
        setDescription('');
        setQuestions([]);
        setCurrentQuestion('');
        setCurrentOptions(['', '', '', '']);
        setCorrectAnswer('');
      } catch (err) {
        console.error('Detailed error:', err);
        if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          alert('Unable to connect to the server. Please check if the backend is running.');
        } else {
          alert(`Error creating quiz: ${err.message}`);
        }
      }
    } else {
      alert('Please add a title and at least one question');
    }
  };
  

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Create New Quiz</h1>

      {/* Quiz Title */}
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />

      {/* Quiz Description */}
      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />

      {/* Current Question */}
      <input
        type="text"
        placeholder={`Question ${editingIndex !== null ? editingIndex + 1 : questionNumber}`}
        value={currentQuestion}
        onChange={(e) => setCurrentQuestion(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />

      {/* Options */}
      {currentOptions.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => {
            const newOptions = [...currentOptions];
            newOptions[index] = e.target.value;
            setCurrentOptions(newOptions);
          }}
          className="border p-2 w-full mb-2 rounded-md"
        />
      ))}

      {/* Correct Answer */}
      <input
        type="text"
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />

      <button
        onClick={addQuestion}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full sm:w-auto"
      >
        {editingIndex !== null ? 'Update Question' : 'Add Question'}
      </button>

      {/* Questions Preview */}
      {questions.map((q, index) => (
        <div key={index} className="border p-2 mb-2 rounded-md">
          <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
          <ul>
            {q.options.map((opt, idx) => (
              <li key={idx}>{opt}</li>
            ))}
          </ul>
          <p><strong>Answer:</strong> {q.correctAnswer}</p>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default QuizCreatePage;
