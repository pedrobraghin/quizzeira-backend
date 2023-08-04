/* eslint-disable */

import { Request, Response, NextFunction } from "express";

export function CatchExpressError(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return async function (req: Request, res: Response, next: NextFunction) {
        await boundFn(req, res, next).catch(next);
      };
    },
  };

  return newDescriptor;
}
