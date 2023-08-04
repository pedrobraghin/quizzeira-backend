import { AppEror } from "./AppError";

export class ForbiddenError extends AppEror {
  constructor(message: string) {
    super(403, message);
  }
}
