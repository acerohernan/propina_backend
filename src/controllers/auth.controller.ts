import { Request, Response } from 'express';
import { omit } from 'lodash';
import CONFIG from '../../config';
import ForgotPasswordRequestModel from '../models/auth/forgotPassword.model';
import { userPrivateFields } from '../models/user/user.model';
import {
  createSession,
  queryForgotPasswordRequest,
} from '../services/auth.service';
import { createPaymentMethods } from '../services/payment.service';
import {
  createUser,
  createUserTexts,
  queryUser,
  updateUser,
} from '../services/user.service';
import { compareHash, hashString } from '../utils/bcrypt';
import { httpError } from '../utils/errorHandler';
import { signJwt } from '../utils/jwt';
import logger from '../utils/logger';

export async function signUpHandler(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;

    const userExistByEmail = await queryUser({ email });

    if (userExistByEmail) {
      return httpError(400, 'El email ya se encuentra registrado', res);
    }

    const userExitByUsername = await queryUser({ username });

    if (userExitByUsername) {
      return httpError(
        400,
        'El nombre de usuario ya se encuentra registrado',
        res
      );
    }

    //Encrypt password
    const hashPassword = await hashString(password);

    const newUser = await createUser({
      ...req.body,
      password: hashPassword,
    });

    await createUserTexts({ userId: newUser?._id });
    await createPaymentMethods({ userId: newUser?._id });

    res.status(200).json({
      message: 'Usuario registrado correctamente',
      success: true,
    });
  } catch (e: any) {
    logger.error(e.message);
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Error de servidor',
    });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await queryUser({ email });

    if (!user) {
      return httpError(
        400,
        'El correo electrónico no se encuentra registrado.',
        res
      );
    }

    //Verify password
    const isValid = await compareHash(password, user.password);

    if (!isValid)
      return httpError(
        401,
        'El correo electrónico o la contraseña son inválidos',
        res
      );

    //Create session
    const session = await createSession({
      userId: user._id,
      userAgent: req.get('user-agent') || '',
    });

    //Sign access y refresh token
    const userToJwt = omit(user, userPrivateFields);

    const {
      jwt: { accessTokenDuration, refreshTokenDuration },
    } = CONFIG;

    const accessToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: accessTokenDuration,
      }
    );

    const refreshToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: refreshTokenDuration,
      }
    );

    res.status(200).json({
      message: `Bienvenido ${user.name}`,
      success: true,
      data: {
        token: accessToken,
        refreshToken,
        user: userToJwt,
      },
    });
  } catch (e: any) {
    logger.error(e.message);
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Error de servidor',
    });
  }
}

export async function requestForgotPasswordHandler(
  req: Request,
  res: Response
) {
  try {
    const { email } = req.body;

    const user = await queryUser({ email });

    if (!user) return httpError(400, 'El usuario no existe', res);

    const code = '123456';

    await ForgotPasswordRequestModel.create({
      userId: user._id,
      code,
    });

    /* Send the code in email */
    console.log(code);

    return res.status(200).json({
      message:
        'Los pasos para restablecer su contraseña se enviaron a su correo electrónico',
      success: true,
    });
  } catch (e: any) {
    return httpError(500, 'Error de servidor', res);
  }
}

export async function verifyCodeHandler(req: Request, res: Response) {
  try {
    const { code } = req.params;

    const request = await queryForgotPasswordRequest({ code });

    if (!request) return httpError(400, 'El código ingresado es inválido', res);

    res.status(200).json({
      success: true,
      message: 'Código válido',
    });
  } catch (e: any) {
    return httpError(500, 'Error de servidor', res);
  }
}

export async function changePasswordHandler(req: Request, res: Response) {
  try {
    const { code, password } = req.body;

    const request = await queryForgotPasswordRequest({ code });

    if (!request) return httpError(400, 'El código es inválido', res);

    //Encrypt the password
    const hashPassword = await hashString(password);

    await updateUser({ _id: request.userId }, { password: hashPassword });

    res.status(200).json({
      success: true,
      message: 'Cambio de contraseña exitoso',
    });
  } catch (e: any) {
    return httpError(500, 'Error de servidor', res);
  }
}
