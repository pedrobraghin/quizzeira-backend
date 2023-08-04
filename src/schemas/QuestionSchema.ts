import { Schema, model } from "mongoose";
import { OutputQuestionDTO } from "../@types/OutputQuestionDTO";

const questionAlternativeSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      select: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const questionSchema = new Schema<OutputQuestionDTO>(
  {
    author: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    alternatives: {
      type: [
        {
          type: questionAlternativeSchema,
          required: true,
        },
      ],
      required: true,
      min: 2,
      max: 5,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    multiAnswer: {
      type: Boolean,
      required: true,
    },
    published: {
      type: Boolean,
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

export const QuestionSchema = model("Question", questionSchema);
