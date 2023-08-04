import UserController from "../modules/user/UserController";

import { Router } from "express";
import { auth } from "../middlewares/auth";

import EAccessLevel from "../enums/EAccessLevel";

const usersRouter = Router();

usersRouter.post("/", UserController.createUser);
usersRouter.post("/login", UserController.loginUser);
usersRouter.get("/logout", UserController.logoutUser);

usersRouter.post(
  "/admin",
  auth(EAccessLevel.ADMIN_ACCESS),
  UserController.createAdminUser
);

usersRouter.use(auth(EAccessLevel.USER_ACCESS));

usersRouter.get("/", UserController.index);
usersRouter.get("/me", UserController.getMe);
usersRouter.get("/:identifier", UserController.getUser);

usersRouter.delete("/", UserController.deleteUser);
usersRouter.patch("/", UserController.updateUser);

export { usersRouter };
