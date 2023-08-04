import { Schema, model } from "mongoose";

import { OutputUserDTO } from "../@types/OutputUserDTO";

const userSchema = new Schema<OutputUserDTO>(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    name: {
      type: Object,
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
      required: true,
    },
    fullName: {
      type: String,
    },
    nickname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      select: false,
    },
    accessLevel: {
      type: Number,
      default: 0,
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

userSchema.pre("save", function () {
  this.fullName = `${this.name.first} ${this.name.last}`;
});

export const UserSchema = model("User", userSchema);
