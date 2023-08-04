import "dotenv/config";

import Server from "./server";
import Database from "./database/db";

import { Logger } from "./services/Logger";
import { app } from "./app";

const port = Number(process.env.PORT);

const server = new Server(app, port);
const database = new Database();

try {
  server.start(() => {
    Logger.log(`Server is running on port: ${port}`);
    Logger.log("Connecting to database...");

    database
      .connect()
      .then(() => {
        Logger.log(`Database connection established.`);
      })
      .catch((e) => {
        Logger.error("Database connection timeout. Trying to connect again...");
      });
  });
} catch (err) {
  Logger.error("An error occurrend and the server was finalized.");
  server.stop();
  database.disconnect();
}

process.on("SIGALRM", () => {
  server.stop(() => {
    Logger.error("Server finalized by SIGALRM.");
  });
});
