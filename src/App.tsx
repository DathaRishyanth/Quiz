import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';
import QuizSettings from './components/QuizSettings';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';
import { Question, QuizSettings as QuizSettingsType, QuizState } from './types/quiz';

function App() {
  const [settings, setSettings] = useState<QuizSettingsType>({
    amount: 10,
    category: '9',
    difficulty: 'medium',
    type: 'multiple'
  });

  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isComplete: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://opentdb.com/api.php`, {
        params: {
          amount: settings.amount,
          category: settings.category,
          difficulty: settings.difficulty,
          type: settings.type
        }
      });

      if (response.data.response_code === 0) {
        setQuizState({
          questions: response.data.results,
          currentQuestionIndex: 0,
          score: 0,
          answers: new Array(response.data.results.length).fill(''),
          isComplete: false
        });
        setQuizStarted(true);
      } else {
        setError('Failed to load questions. Please try different settings.');
      }
    } catch (err) {
      setError('An error occurred while fetching questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = answer;

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
      score: newAnswers.reduce((score, ans, index) => 
        ans === prev.questions[index].correct_answer ? score + 1 : score, 0
      )
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setQuizState(prev => ({ ...prev, isComplete: true }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isComplete: false
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-indigo-600 animate-pulse mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {!quizStarted && (
            <QuizSettings
              settings={settings}
              onSettingsChange={setSettings}
              onStartQuiz={fetchQuestions}
            />
          )}

          {quizStarted && !quizState.isComplete && (
            <>
              <div className="w-full max-w-2xl mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">
                    Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
                  </p>
                  <p className="text-lg font-medium text-indigo-600">
                    Score: {quizState.score}
                  </p>
                </div>
              </div>

              <QuizQuestion
                question={quizState.questions[quizState.currentQuestionIndex]}
                selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
                showResult={false}
              />

              <div className="mt-6 flex justify-between w-full max-w-2xl">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={quizState.currentQuestionIndex === 0}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {quizState.currentQuestionIndex === quizState.questions.length - 1 ? (
                    'Finish Quiz'
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {quizState.isComplete && (
            <QuizResults
              questions={quizState.questions}
              userAnswers={quizState.answers}
              score={quizState.score}
              onRetry={resetQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;