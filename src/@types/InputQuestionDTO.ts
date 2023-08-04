export interface Alternative {
  content: String;
  isCorrect: boolean;
}

export interface InputQuestionDTO {
  title: String;
  alternatives: Array<Alternative>;
  category: String;
  author: String;
  difficulty: Number;
  published?: boolean;
}
