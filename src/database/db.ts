import mongoose from "mongoose";

export default class Database {
  private DB_URL = String(process.env.DB_URL);

  constructor() {
    mongoose.set("strictQuery", true);
    mongoose.createConnection(this.DB_URL);
  }

  public async connect() {
    await mongoose.connect(this.DB_URL);
  }

  public async disconnect() {
    await mongoose.disconnect();
  }
}
