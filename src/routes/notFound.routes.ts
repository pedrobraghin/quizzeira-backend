import { Request, Response, NextFunction } from "express";

export function notFound(req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
}
