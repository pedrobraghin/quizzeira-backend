import { AppEror } from "./AppError";

export class UnauthorizedError extends AppEror {
  constructor(message: string) {
    super(401, message);
  }
}
