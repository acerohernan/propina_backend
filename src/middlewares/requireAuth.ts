import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../services/auth.service';
import { httpError } from '../utils/errorHandler';
import { verifyJwt } from '../utils/jwt';

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    const refreshToken = get(req.headers, 'refresh-token');

    if (!accessToken) return httpError(403, 'Usuario no autorizado', res);

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (!expired) return httpError(403, 'Token de autorización inválido', res);

    if (!refreshToken)
      return httpError(403, 'Token de autorización inválido', res);

    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (!newAccessToken) return httpError(403, 'Usuario no autorizado', res);

    const result = verifyJwt(newAccessToken);

    res.setHeader('x-access-token', newAccessToken);
    res.locals.user = result.decoded;
    return next();
  } catch (e) {
    return httpError(500, 'Error de servidor', res);
  }
}
