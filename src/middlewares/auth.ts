import { GetUserByIdService } from "../modules/user/GetUserByIdService";
import { Request, Response, NextFunction } from "express";

import JWTHandler from "../jwt/JWTHandler";
import EAccessLevel from "../enums/EAccessLevel";
import UsersRepository from "../modules/user/UsersRepository";

import { ForbiddenError } from "../errors/ForbiddenError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export function auth(accessLevel: EAccessLevel) {
  return async function (req: Request, _res: Response, next: NextFunction) {
    try {
      const token =
        req.headers.authorization?.split(" ")[1] || req.cookies["jwt"];

      if (!token) {
        return next(new UnauthorizedError("Invalid or expired token"));
      }

      const payload = JWTHandler.validateToken(token);

      const getUserService = new GetUserByIdService(UsersRepository);
      const user = await getUserService.execute(payload.id);

      if (user.accessLevel < accessLevel) {
        return next(new ForbiddenError("Forbidden"));
      }
      req.app.locals.user = user;
      next();
    } catch (err) {
      return next(new UnauthorizedError("Invalid or expired token"));
    }
  };
}
