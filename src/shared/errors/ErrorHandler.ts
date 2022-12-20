import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from './AppError';

export default class ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static handler(error: Error, request: Request, response: Response, next: NextFunction): Response {
    console.log(error);
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      return response.status(500).json({
        status: 'Error',
        message: 'Internal server error',
      });
    }
  }
}
