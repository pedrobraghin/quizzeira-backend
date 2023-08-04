import { DateUtils } from "../utils/DateUtils";

export class Logger {
  private static readonly RED_COLOR_ANSI_CODE = "\x1b[31m%s\x1b[0m";

  public static error(message: string) {
    const logMessage = this.formatLogMessage(message);
    console.error(this.RED_COLOR_ANSI_CODE, `[ERROR] ${logMessage}`);
  }

  public static warn(message: string) {
    const logMessage = this.formatLogMessage(message);
    console.log(`[WARN] ${logMessage}`);
  }

  public static log(message: string) {
    const logMessage = this.formatLogMessage(message);
    console.log(`[INFO]`, logMessage);
  }

  private static formatLogMessage(message: string) {
    const logTime = DateUtils.currentTimeForLog();
    const logMessage = `${logTime}: ${message}`;
    return logMessage;
  }
}
