import React from 'react';
import { Brain, BookOpen, Dumbbell } from 'lucide-react';

interface QuizSettingsProps {
  settings: {
    amount: number;
    category: string;
    difficulty: string;
    type: string;
  };
  onSettingsChange: (settings: any) => void;
  onStartQuiz: () => void;
}

const categories = [
  { id: '9', name: 'General Knowledge' },
  { id: '17', name: 'Science & Nature' },
  { id: '21', name: 'Sports' },
  { id: '23', name: 'History' },
];

const difficulties = ['easy', 'medium', 'hard'];

export default function QuizSettings({ settings, onSettingsChange, onStartQuiz }: QuizSettingsProps) {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Brain className="w-8 h-8 text-indigo-600" />
        <h2 className="ml-2 text-2xl font-bold text-gray-800">Quiz Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Questions</label>
          <input
            type="number"
            min="1"
            max="50"
            value={settings.amount}
            onChange={(e) => onSettingsChange({ ...settings, amount: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={settings.category}
            onChange={(e) => onSettingsChange({ ...settings, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            value={settings.difficulty}
            onChange={(e) => onSettingsChange({ ...settings, difficulty: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onStartQuiz}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Start Quiz
        </button>
      </div>
    </div>
  );
}