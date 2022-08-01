import { Response } from 'express';

export function httpError(
  code: number = 500,
  message: string = 'Error de servidor',
  res: Response
) {
  return res.status(code).json({
    success: false,
    message,
  });
}
