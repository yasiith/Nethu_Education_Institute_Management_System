'use client'

import React, { useState, useEffect } from 'react';

const QuizCreatePage = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setQuestionNumber(questions.length + 1);
  }, [questions]);

  const addQuestion = () => {
    if (currentQuestion.trim() && correctAnswer.trim()) {
      if (editingIndex !== null) {
        // Update existing question
        const updatedQuestions = questions.map((q, index) => 
          index === editingIndex ? { question: currentQuestion, options: currentOptions, answer: correctAnswer } : q
        );
        setQuestions(updatedQuestions);
        setEditingIndex(null);
      } else {
        // Add new question
        setQuestions([...questions, {
          question: currentQuestion,
          options: currentOptions,
          answer: correctAnswer
        }]);
      }

      // Reset fields
      setCurrentQuestion('');
      setCurrentOptions(['', '', '', '']);
      setCorrectAnswer('');
    } else {
      alert('Please fill out all fields');
    }
  };

  const editQuestion = (index) => {
    const questionToEdit = questions[index];
    setCurrentQuestion(questionToEdit.question);
    setCurrentOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.answer);
    setEditingIndex(index);
  };

  const handleSave = () => {
    if (title.trim() && questions.length > 0) {
      const quizData = { title, questions };
      console.log('Quiz Data:', quizData);
      alert('Quiz Created Successfully!');
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

      {/* Current Question Input */}
      <input
        type="text"
        placeholder={`Question ${editingIndex !== null ? editingIndex + 1 : questionNumber}`}
        value={currentQuestion}
        onChange={(e) => setCurrentQuestion(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />

      {/* Options Inputs */}
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

      {/* Correct Answer Input */}
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
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Questions:</h2>
        {questions.map((q, index) => (
          <div key={index} className="border p-2 mb-2 rounded-md">
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            <ul className="list-disc pl-5">
              {q.options.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <p><strong>Answer:</strong> {q.answer}</p>
            <button 
              onClick={() => editQuestion(index)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

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
