import { number, object, string } from 'zod';

export const getUserInformationSchema = object({
  params: object({
    username: string({
      required_error: 'El nombre de usuario es requerido',
    }).min(6, 'Ingrese un nombre de usuario válido'),
  }),
});

export const updateUserSchema = object({
  body: object({
    categoryId: string({
      required_error: 'La categoría es requerida',
    }),
    email: string({
      required_error: 'El correo electrónico es requerido',
    }).email('Ingrese un correo electrónico valido'),
    name: string({
      required_error: 'El nombre de la página es requerido',
    }),
    username: string({
      required_error: 'El nombre de usuario es requerido',
    }).min(6, 'El nombre de usuario debe de tener 6 caracteres como mínimo'),
    tipPrice: number({
      required_error: 'El precio de la propina es requerido',
    }),
  }),
});
