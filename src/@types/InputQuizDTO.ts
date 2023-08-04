export interface InputQuizDTO {
  title: string;
  category: string;
  description: string;
  questions: Array<String>;
  questionsCount: number;
  img?: {
    altText?: string;
    src: string;
  };
  percentageToApproval: number;
  published?: boolean;
  author: String;
}
