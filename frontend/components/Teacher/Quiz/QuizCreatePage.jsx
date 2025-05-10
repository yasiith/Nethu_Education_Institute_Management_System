'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const QuizCreatePage = () => {
  const pathname = usePathname(); // Access the current URL path
  const [classID, setClassID] = useState(''); // ClassID state
  const [month, setMonth] = useState(''); // Month state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Extract ClassID from URL
  useEffect(() => {
    const pathSegments = pathname.split('/');
    const classIDFromURL = pathSegments[pathSegments.indexOf('classes') + 1];
    const monthFromURL = pathSegments[pathSegments.indexOf('months') + 1];
    if (classIDFromURL) {
      setClassID(classIDFromURL);
    }
    if (monthFromURL) {
      setMonth(monthFromURL);
    }
  }, [pathname]);

  useEffect(() => {
    setQuestionNumber(questions.length + 1);
  }, [questions]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const addQuestion = () => {
    if (currentQuestion.trim() && correctAnswer.trim()) {
      if (currentOptions.some(option => option.trim() === '')) {
        showNotification('Please fill out all options', 'error');
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
        showNotification('Question updated successfully', 'success');
      } else {
        setQuestions([
          ...questions,
          {
            questionText: currentQuestion,
            options: currentOptions,
            correctAnswer: correctAnswer,
          },
        ]);
        showNotification('Question added successfully', 'success');
      }

      setCurrentQuestion('');
      setCurrentOptions(['', '', '', '']);
      setCorrectAnswer('');
    } else {
      showNotification('Please fill out all fields', 'error');
    }
  };

  const handleSave = async () => {
    if (title.trim() && questions.length > 0 && classID.trim()) {
      const quizData = {
        classID,
        title,
        description,
        questions,
        month,
        // Add the teacher's ID as createdBy
        createdBy: 'teacherUserID' // Replace 'teacherUserID' with the actual teacher ID from the JWT token
      };
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          showNotification('You are not logged in. Please log in first.', 'error');
          return;
        }
  
        const response = await fetch('http://143.110.187.69:5000/api/quizzes/create', {
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
  
        showNotification('Quiz Created Successfully!', 'success');
        setTitle('');
        setDescription('');
        setQuestions([]);
        setCurrentQuestion('');
        setCurrentOptions(['', '', '', '']);
        setCorrectAnswer('');
      } catch (err) {
        console.error('Detailed error:', err);
        if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          showNotification('Unable to connect to the server. Please check if the backend is running.', 'error');
        } else {
          showNotification(`Error creating quiz: ${err.message}`, 'error');
        }
      }
    } else {
      showNotification('Please add a title and at least one question', 'error');
    }
  };

  const editQuestion = (index) => {
    const question = questions[index];
    setCurrentQuestion(question.questionText);
    setCurrentOptions([...question.options]);
    setCorrectAnswer(question.correctAnswer);
    setEditingIndex(index);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    showNotification('Question deleted', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50 py-8">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white transition-opacity duration-300`}>
          <p>{notification.message}</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
            <h1 className="text-3xl font-bold text-white">Create New Quiz</h1>
            <p className="text-green-100 mt-2">
              {month && `For ${month}`} {classID && `- Class ID: ${classID}`}
            </p>
          </div>

          <div className="p-6">
            {/* Quiz Details Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quiz Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter quiz title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    placeholder="Enter quiz description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Add Questions Section */}
            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingIndex !== null ? `Edit Question ${editingIndex + 1}` : `Add Question ${questionNumber}`}
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <input
                    id="question"
                    type="text"
                    placeholder="Enter your question"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentOptions.map((option, index) => (
                    <div key={index}>
                      <label htmlFor={`option-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Option {index + 1}
                      </label>
                      <input
                        id={`option-${index}`}
                        type="text"
                        placeholder={`Enter option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentOptions];
                          newOptions[index] = e.target.value;
                          setCurrentOptions(newOptions);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
                  <input
                    id="answer"
                    type="text"
                    placeholder="Enter the correct answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                </div>
                <button
                  onClick={addQuestion}
                  className="w-full py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-colors"
                >
                  {editingIndex !== null ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </div>

            {/* Questions Preview Section */}
            {questions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions Preview</h2>
                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">
                          Question {index + 1}: {q.questionText}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editQuestion(index)}
                            className="text-teal-600 hover:text-teal-800"
                            title="Edit Question"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteQuestion(index)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Question"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul className="mt-2 pl-5 list-disc text-gray-600">
                        {q.options.map((opt, idx) => (
                          <li key={idx} className="mt-1">
                            {opt} {opt === q.correctAnswer && <span className="text-green-600 font-medium">(Correct)</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-colors shadow-md font-medium"
              >
                Save Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCreatePage;