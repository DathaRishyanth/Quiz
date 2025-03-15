import React from 'react';
import { Question } from '../types/quiz';
import { clsx } from 'clsx';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
}

export default function QuizQuestion({ question, selectedAnswer, onAnswerSelect, showResult }: QuizQuestionProps) {
  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  const getButtonClass = (answer: string) => {
    if (!showResult) {
      return clsx(
        'w-full p-4 text-left rounded-lg border transition-colors',
        selectedAnswer === answer
          ? 'bg-indigo-100 border-indigo-500'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      );
    }

    if (answer === question.correct_answer) {
      return 'w-full p-4 text-left rounded-lg border bg-green-100 border-green-500';
    }

    if (selectedAnswer === answer && answer !== question.correct_answer) {
      return 'w-full p-4 text-left rounded-lg border bg-red-100 border-red-500';
    }

    return 'w-full p-4 text-left rounded-lg border bg-white border-gray-200';
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <span className="text-sm font-medium text-indigo-600">{question.category}</span>
          <h3 className="mt-2 text-xl font-semibold text-gray-900" dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>

        <div className="space-y-3">
          {answers.map((answer) => (
            <button
              key={answer}
              onClick={() => !showResult && onAnswerSelect(answer)}
              className={getButtonClass(answer)}
              disabled={showResult}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}