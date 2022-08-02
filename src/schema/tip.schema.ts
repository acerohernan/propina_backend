import mongoose from 'mongoose';
import { number, object, string } from 'zod';

export const createTipRequestSchema = object({
  body: object({
    userId: string({
      required_error: 'El id del usuario es requerido.',
    }),
    voucher: string({
      required_error: 'El voucher es requerido',
    }),
    quantity: number({
      required_error: 'La cantidad de propinas es requerido',
    }),
  }).refine((data) => mongoose.isValidObjectId(data.userId), {
    message: 'El id del usuario no es válido',
    path: ['userId'],
  }),
});

export const acceptTipRequestSchema = object({
  params: object({
    requestId: string({
      required_error: 'El id de la solicitud de propina es requerida',
    }),
  }).refine((data) => mongoose.isValidObjectId(data.requestId), {
    message: 'El id de la solicitud de la propina es inválido',
    path: ['requestId'],
  }),
});
