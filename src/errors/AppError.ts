import EStatusCode from "../enums/EStatusCode";

export class AppEror extends Error {
  public readonly statusCode: EStatusCode;

  public constructor(statusCode: EStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
