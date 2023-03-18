export interface Question {
  text?: string;
  correctAnswers?: string[];
  wrongAnswers?: string[];
}

export interface CreateQuestionRequest {
  text?: string;
  correctAnswers?: string[];
  wrongAnswers?: string[];
}

export interface UpdateQuestionRequest {
  guid?: string;
  text?: string;
  correctAnswers?: string[];
  wrongAnswers?: string[];
}
