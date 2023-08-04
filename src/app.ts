import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import limiter from "express-rate-limit";
import sanitize from "express-mongo-sanitize";
import morgan from "morgan";
import router from "./routes/app.routes";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./routes/notFound.routes";

const BASE_API_URL = String(process.env.BASE_API_URL);

const app = express();

const corsOptions: CorsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(express.json({ limit: 10000 }));
app.use(express.urlencoded({ extended: true, limit: 10000 }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(sanitize());

app.use(
  limiter({
    max: 100,
  })
);

if (process.env.NODE_ENV !== "development") {
  app.use(morgan("dev"));
}

app.use(BASE_API_URL, router);
app.all("*", notFound);
app.use(errorHandler);

export { app };
