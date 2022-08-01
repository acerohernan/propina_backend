import { object, string } from 'zod';

export const addYapeSchema = object({
  body: object({
    phone: string({
      required_error: 'El número telefónico es requerido',
    })
      .min(9, 'Ingrese un número de celular válido')
      .max(9, 'Ingrese un número de celular válido'),
    qr: string({
      required_error: 'La foto del su qr de yape es requerida',
    }),
    ownerName: string({
      required_error: 'El nombre del titular del yape es requerido',
    }),
  }),
});

export const addBcpSchema = object({
  body: object({
    accountNumber: string({
      required_error: 'El número de cuenta es requerido',
    }),
    cci: string({
      required_error: 'El código de cuenta interbancario es requerida',
    }),
    accountOwner: string({
      required_error: 'El nombre del titular de la cuenta es requerido',
    }),
  }),
});
