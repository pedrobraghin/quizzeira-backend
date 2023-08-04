import { isObjectIdOrHexString } from "mongoose";

export class MongoUtils {
  static isValidId(id: String): boolean {
    return isObjectIdOrHexString(id);
  }

  static calculateSkipCount(offset: number, limit: number): number {
    return offset ? (offset - 1) * limit : 0;
  }
}
