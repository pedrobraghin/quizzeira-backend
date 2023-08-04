export class DateUtils {
  static currentTimeForLog() {
    const { hours, minutes, seconds } = this.currentTime();

    const date = `[${hours}:${minutes}:${seconds}]`;

    return date;
  }

  static currentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    return { hours, minutes, seconds };
  }
}
