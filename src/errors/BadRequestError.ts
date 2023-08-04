import { AppEror } from "./AppError";

export class BadRequestError extends AppEror {
  constructor(message: string) {
    super(400, message);
  }
}
