import { model, Schema } from "mongoose";
import { OutputFlashcardDTO } from "../@types/OuputFlashcardDTO";

const flashcardSchema = new Schema<OutputFlashcardDTO>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
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

export const FlashcardSchema = model("Flashcard", flashcardSchema);
