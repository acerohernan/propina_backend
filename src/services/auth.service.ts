import { get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import ForgotPasswordRequestModel, {
  ForgotPasswordRequestDocument,
} from '../models/auth/forgotPassword.model';

import SessionModel, { SessionInput } from '../models/auth/session.model';

import { signJwt, verifyJwt } from '../utils/jwt';
import { queryUser } from './user.service';

export async function createSession(sessionInput: SessionInput) {
  try {
    const session = await SessionModel.create(sessionInput);

    return session;
  } catch (e: any) {
    console.log(e);
    throw new Error('Error al crear session en la base de datos');
  }
}

export async function reIssueAccessToken(
  refreshToken: string | string[]
): Promise<string | false> {
  if (typeof refreshToken !== 'string') return false;

  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findOne({
    _id: get(decoded, 'session'),
  });

  if (!session || !session.valid) return false;

  const user = await queryUser({ _id: session.userId });

  if (!user) return false;

  const newAccessToken = signJwt({
    ...user.toJSON(),
    session: session._id,
  });

  return newAccessToken;
}

export async function queryForgotPasswordRequest(
  query: FilterQuery<ForgotPasswordRequestDocument>,
  options: QueryOptions = {}
) {
  try {
    const request = await ForgotPasswordRequestModel.findOne(query, options);
    return request;
  } catch (e: any) {
    console.log(e);
    throw new Error(
      'Error al obtener la solicitud de olvido de contraseña de la base de datos'
    );
  }
}
