import { Request, Response } from 'express';
import {
  createBcpPayment,
  createYapePayment,
  queryPaymentMethods,
  updatePaymentMethods,
} from '../services/payment.service';
import { httpError } from '../utils/errorHandler';

export async function addYapePaymentHandler(req: Request, res: Response) {
  try {
    const yape = req.body;
    const user = res.locals.user;

    const payment = await queryPaymentMethods({ userId: user._id });

    if (!payment) return httpError(404, 'No se encuntra el usuario', res);

    await createYapePayment({
      paymentMethodsId: payment?._id,
      qr: yape.qr,
      ownerName: yape.ownerName,
      phone: yape.phone,
    });

    await updatePaymentMethods({ _id: payment?._id }, { yape: true });

    res.status(200).json({
      success: true,
      message: 'Se añadió Yape como método de donación',
    });
  } catch (e: any) {
    console.log(e);
    return httpError(500, 'Error de servidor', res);
  }
}

export async function addBcpPaymentHandler(req: Request, res: Response) {
  try {
    const bcp = req.body;
    const user = res.locals.user;

    const payment = await queryPaymentMethods({ userId: user._id });

    if (!payment) return httpError(404, 'No se encuntra el usuario', res);

    await createBcpPayment({
      paymentMethodsId: payment?._id,
      accountNumber: bcp.accountNumber,
      cci: bcp.cci,
      accountOwner: bcp.accountOwner,
    });

    await updatePaymentMethods({ _id: payment?._id }, { bcp: true });

    res.status(200).json({
      success: true,
      message: 'Se añadió su cuenta BCP como método de donación',
    });
  } catch (e: any) {
    console.log(e);
    return httpError(500, 'Error de servidor', res);
  }
}
