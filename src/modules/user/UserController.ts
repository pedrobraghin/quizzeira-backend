import { GetUserService } from "./GetUserService";
import { Request, Response, NextFunction } from "express";

import EStatusCode from "../../enums/EStatusCode";
import InputUserDTO from "../../@types/InputUserDTO";
import UsersRepository from "./UsersRepository";

import { CreateUserService } from "./CreateUserService";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { LoginUserService } from "./LoginUserService";
import { GetUserByIdService } from "./GetUserByIdService";
import { DeleteUserService } from "./DeleteUserService";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UpdateUserService } from "./UpdateUserService";
import { CookieUtils } from "../../utils/CookieUtils";
import { MongoUtils } from "../../utils/MongoUtils";

class UserController {
  constructor(private usersRepository: IUsersRepository) {}

  @CatchExpressError
  async createUser(req: Request, res: Response, _next: NextFunction) {
    const input: InputUserDTO = req.body;
    const createUserService = new CreateUserService(this.usersRepository);
    const user = await createUserService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: user,
    });
  }

  @CatchExpressError
  async getUser(req: Request, res: Response, _next: NextFunction) {
    const { id, identifier } = req.params;
    let user;

    const isMongoId = MongoUtils.isValidId(id);

    if (isMongoId) {
      const getUserByIdService = new GetUserByIdService(this.usersRepository);
      user = await getUserByIdService.execute(id as string);
    } else {
      const getUserService = new GetUserService(this.usersRepository);
      user = await getUserService.execute(identifier as string);
    }

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: user,
    });
  }

  @CatchExpressError
  async loginUser(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body;
    const loginUSerService = new LoginUserService(this.usersRepository);
    const token = await loginUSerService.execute(email, password);

    CookieUtils.sessionCookie(res, token);

    return res.status(EStatusCode.OK).json({
      status: "success",
      token,
    });
  }
  @CatchExpressError
  async logoutUser(req: Request, res: Response, _next: NextFunction) {
    CookieUtils.removeSessionCookie(res);

    return res.status(EStatusCode.OK).json({
      status: "success",
    });
  }

  @CatchExpressError
  async getMe(req: Request, res: Response, _next: NextFunction) {
    return res.status(EStatusCode.OK).json({
      status: "success",
      data: req.app.locals.user,
    });
  }

  @CatchExpressError
  async deleteUser(req: Request, res: Response, _next: NextFunction) {
    const { _id } = req.app.locals.user;

    const deleteUserService = new DeleteUserService(this.usersRepository);
    await deleteUserService.execute(_id);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "succes",
    });
  }

  @CatchExpressError
  async updateUser(req: Request, res: Response, _next: NextFunction) {
    const input: Partial<InputUserDTO> = req.body;

    const updateUserService = new UpdateUserService(this.usersRepository);
    const updatedUser = await updateUserService.execute(
      req.app.locals.user._id,
      input
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: updatedUser,
    });
  }

  @CatchExpressError
  async index(req: Request, res: Response, _next: NextFunction) {}

  @CatchExpressError
  async createAdminUser(req: Request, res: Response, _next: NextFunction) {
    const input: InputUserDTO = req.body;
    const createUserService = new CreateUserService(this.usersRepository);
    const user = await createUserService.execute(input, true);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: user,
    });
  }
}

export default new UserController(UsersRepository);
