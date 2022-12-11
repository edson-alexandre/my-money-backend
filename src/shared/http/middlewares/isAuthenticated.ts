import { IPayload } from './../../../modules/interfaces/IPayload';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import AppError from '../../errors/AppError';
const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const [bearer, token] = req.headers.authorization.split(' ');

  if (bearer?.toUpperCase() !== 'BEARER') {
    throw new AppError('Token jwt não localizado', 401);
  }
  if (!token) {
    throw new AppError('Token jwt não localizado', 401);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY) as IPayload;
    req.user = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    throw new AppError('Token jwt inválido', 401);
  }
};

export default isAuthenticated;
