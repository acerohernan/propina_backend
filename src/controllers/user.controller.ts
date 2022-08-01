import { Request, Response } from 'express';
import { omit } from 'lodash';
import { userPrivateFields } from '../models/user/user.model';
import { getPaymentMethodFromUser } from '../services/payment.service';
import {
  queryUser,
  queryUserTexts,
  updateUser,
  updateUserTexts,
} from '../services/user.service';
import { httpError } from '../utils/errorHandler';

export async function getUserInformationHandler(req: Request, res: Response) {
  try {
    const { username } = req.params;

    const user = await queryUser({ username });

    if (!user) return httpError(404, 'Usuario no encontrado', res);

    const userToSend = omit(user, userPrivateFields);

    //Get user's texts
    const texts = await queryUserTexts({ userId: user?._id });

    //Get user's payment methods
    const payment = await getPaymentMethodFromUser(user?._id);

    res.status(200).json({
      success: true,
      message: 'Usuario encontrado con éxito',
      data: { user: { ...userToSend, texts, payment } },
    });
  } catch (e: any) {
    console.log(e);
    httpError(500, 'Error de servidor', res);
  }
}

export async function updateUserInformationHandler(
  req: Request,
  res: Response
) {
  try {
    const { texts, ...user } = req.body;
    const { username, email } = user;

    //Check if the authorized user is updating only his information
    //The "requireAuth" middleware saves the decrypted jwt in res.locals.user
    if (email !== res.locals.user.email)
      return httpError(
        401,
        'No estás autorizado para editar este usuario',
        res
      );

    //Check if the user is valid
    const dbUser = await queryUser({ email });

    if (!dbUser) return httpError(400, 'Usuario no encontrado', res);

    //Check if the user update his username
    if (username !== dbUser?.username) {
      const exists = await queryUser({ username });

      if (exists)
        return httpError(
          400,
          'El nombre de usuario ya existe, intenta con otro',
          res
        );
    }

    await updateUser({ _id: dbUser?._id }, req.body);

    //Check if the user want to update his texts
    if (texts) {
      await updateUserTexts({ userId: dbUser?._id }, texts);
    }

    res.status(200).json({
      success: true,
      message: 'Usuario ha sido editado exitosamente',
    });
  } catch (e: any) {
    console.log(e);
    httpError(500, 'Error de servidor', res);
  }
}
