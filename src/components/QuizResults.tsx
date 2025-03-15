import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { Question } from '../types/quiz';

interface QuizResultsProps {
  questions: Question[];
  userAnswers: string[];
  score: number;
  onRetry: () => void;
}

export default function QuizResults({ questions, userAnswers, score, onRetry }: QuizResultsProps) {
  const percentage = (score / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full">
          <Trophy className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Quiz Complete!</h2>
        <p className="mt-2 text-lg text-gray-600">
          You scored {score} out of {questions.length} ({percentage.toFixed(1)}%)
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="border-t pt-4">
            <p className="font-medium text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />
            <p className="text-sm text-gray-600">
              Your answer:{' '}
              <span
                className={userAnswers[index] === question.correct_answer ? 'text-green-600' : 'text-red-600'}
                dangerouslySetInnerHTML={{ __html: userAnswers[index] }}
              />
            </p>
            {userAnswers[index] !== question.correct_answer && (
              <p className="text-sm text-gray-600">
                Correct answer:{' '}
                <span className="text-green-600" dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onRetry}
        className="mt-8 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Try Again
      </button>
    </div>
  );
}