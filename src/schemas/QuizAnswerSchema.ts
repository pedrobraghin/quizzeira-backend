import { Schema, model } from "mongoose";
import { OuputQuizAnswerDTO } from "../@types/OuputQuizAnswerDTO";
import { QuestionAnswer } from "../@types/InternInputQuizAnswer";

const questionResultSchema = new Schema<QuestionAnswer>(
  {
    userAnswers: [
      {
        type: String,
        required: true,
      },
    ],
    isCorrect: {
      type: Boolean,
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const quizAnswerSchema = new Schema<OuputQuizAnswerDTO>(
  {
    answeredOn: {
      type: Date,
      default: new Date(),
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    answers: [
      {
        type: questionResultSchema,
        required: true,
      },
    ],
    hits: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const QuizAnswerSchema = model("QuizAnswer", quizAnswerSchema);
