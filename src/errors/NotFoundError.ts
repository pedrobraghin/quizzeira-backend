import { AppEror } from "./AppError";

export class NotFoundError extends AppEror {
  constructor(message: string) {
    super(404, message);
  }
}
