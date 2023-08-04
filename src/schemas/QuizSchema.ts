import { Schema, model } from "mongoose";
import { OutputQuizDTO } from "../@types/OutputQuizDTO";

const quizSchema = new Schema<OutputQuizDTO>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    percentageToApproval: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    img: {
      type: Object,
      altText: {
        type: String,
        required: true,
      },
      src: {
        type: String,
        required: true,
      },
    },
    questions: {
      type: [
        {
          ref: "Question",
          type: Schema.Types.ObjectId,
          required: true,
        },
      ],
    },
    questionsCount: {
      type: Number,
      required: true,
      min: 3,
    },
    published: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false,
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

export const QuizSchema = model("Quiz", quizSchema);
