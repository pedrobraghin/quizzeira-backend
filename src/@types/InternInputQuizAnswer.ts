export interface QuestionAnswer {
  question: String;
  userAnswers: string[];
  isCorrect: boolean;
}

export interface InternInputQuizAnswer {
  userId: String;
  quiz: String;
  answers: Array<QuestionAnswer>;
  hits: number;
  approved: Boolean;
}
