import { Request, Response } from 'express';
import { UserTipInput } from '../models/tip/tip.model';
import { sendEmailForNewTipRequest } from '../services/email.service';
import {
  createTip,
  createTipRequet,
  deleteTipRequest,
  getAllTipsRequestFormUser,
  queryTipRequest,
} from '../services/tip.service';
import { queryUser } from '../services/user.service';
import { httpError } from '../utils/errorHandler';

export async function createTipRequestHandler(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const user = await queryUser({ _id: userId });

    if (!user) return httpError(400, 'El usuario no existe', res);

    await createTipRequet(req.body);

    await sendEmailForNewTipRequest(user?.email, user?.name, req.body.quantity);

    res.status(200).json({
      success: false,
      message: 'Se creó la petición de la propina',
    });
  } catch (e: any) {
    console.error(e);
    return httpError(500, 'Error de servidor', res);
  }
}

export async function getAllTipRequestsHandler(req: Request, res: Response) {
  try {
    const { _id: userId } = res.locals.user;

    if (!userId) return httpError(401, 'Usuario no autorizado', res);

    const requests = await getAllTipsRequestFormUser(userId);

    res.status(200).json({
      success: false,
      message: 'Se obtuvieron todas las peticiones de propina.',
      data: { requests },
    });
  } catch (e: any) {
    console.error(e);
    return httpError(500, 'Error de servidor', res);
  }
}

export async function getSingleTipRequest(req: Request, res: Response) {
  try {
    const { requestId } = req.params;

    const request = queryTipRequest({ _id: requestId });

    if (!request)
      return httpError(
        400,
        'La solicitud de propina no existe. Ya ha sido aceptada o removida.',
        res
      );

    res.status(200).json({
      success: false,
      message: 'Se acceptó correctamente la propina.',
      data: { request },
    });
  } catch (e: any) {
    console.error(e);
    return httpError(500, 'Error de servidor', res);
  }
}

export async function acceptTipRequestHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    const { response } = req.body;
    const { requestId } = req.params;

    const request = await queryTipRequest({ _id: requestId });

    if (!request)
      return httpError(400, 'La solicitud de propina no existe', res);

    const userFromRequest = await queryUser({ _id: request?.userId });

    if (!userFromRequest) return httpError(400, 'El usuario no existe', res);

    if (String(userFromRequest?._id) !== user._id)
      return httpError(401, 'Usuario no autorizado', res);

    const tip: UserTipInput = {
      userId: user._id,
      quantity: request.quantity,
      message: request.message,
      contact: request.contact,
      name: request.name,
      response: response ?? null,
    };

    await createTip(tip);

    await deleteTipRequest({ _id: request._id });

    res.status(200).json({
      success: false,
      message: 'Se acceptó correctamente la propina.',
    });
  } catch (e: any) {
    console.error(e);
    return httpError(500, 'Error de servidor', res);
  }
}

export async function deleteTipRequestHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    const { requestId } = req.params;

    const request = await queryTipRequest({ _id: requestId });

    if (!request)
      return httpError(400, 'La solicitud de propina no existe', res);

    const userFromRequest = await queryUser({ _id: request?.userId });

    if (!userFromRequest) return httpError(400, 'El usuario no existe', res);

    if (String(userFromRequest?._id) !== user._id)
      return httpError(401, 'Usuario no autorizado', res);

    await deleteTipRequest({ _id: request._id });

    res.status(200).json({
      success: false,
      message: 'Se eliminó correctamente la solicitud de propina.',
    });
  } catch (e: any) {
    console.error(e);
    return httpError(500, 'Error de servidor', res);
  }
}
