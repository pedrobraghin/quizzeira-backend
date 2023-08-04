export interface InputQuestionAnswerDTO {
  questionId: string;
  answers: string[];
}

export interface InputQuizAnswerDTO {
  quizId: String;
  userId: String;
  answers: Array<InputQuestionAnswerDTO>;
}
