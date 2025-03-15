export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizSettings {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: string[];
  isComplete: boolean;
}