import { Response, NextFunction, Request } from 'express';

const requestValidation = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  console.log(schema);
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err: any) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

export { requestValidation };
