import { AppEror } from "./AppError";

export class InvalidParametersError extends AppEror {
  constructor(message: string) {
    super(400, message);
  }
}
