import { object, string } from 'zod';

export const singUpSchema = object({
  body: object({
    email: string({
      required_error: 'El correo electrónico es requerido',
    }).email('Ingrese un correo electrónico valido'),
    password: string({
      required_error: 'La contraseña es requerida',
    }).min(8, 'La contraseña debe tener 8 caracteres como mínimo'),
    re_password: string({
      required_error: 'La confirmación de contraseña es requerida',
    }),
    name: string({
      required_error: 'El nombre de la página es requerido',
    }),
    username: string({
      required_error: 'El nombre de usuario es requerido',
    }).min(6, 'El nombre de usuario debe de tener 6 caracteres como mínimo'),
    categoryId: string({
      required_error: 'La categoría es requerida',
    }),
  }).refine((data) => data.password === data.re_password, {
    message: 'Las contraseñas no coinciden',
    path: ['re_password'],
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'El correo electrónico es requerido',
    }).email('Ingrese un correo electrónico válido'),
    password: string({
      required_error: 'La contraseña es requerida',
    }),
  }),
});

export const requestForgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'El correo electrónico es requerido',
    }).email('Ingrese un correo electrónico válido'),
  }),
});

export const verifyCodeSchema = object({
  params: object({
    code: string({
      required_error: 'El código ingresado es inválido.',
    }),
  }),
});

export const changePasswordSchema = object({
  body: object({
    password: string({
      required_error: 'La contraseña es requerida',
    }).min(8, 'La contraseña debe de tener 8 caracteres como mínimo'),
    re_password: string({
      required_error: 'La confirmación de contraseña es requerida',
    }),
    code: string({
      required_error:
        'El código de la solicitud de cambio de contraseña es requerido',
    }),
  }).refine((data) => data.re_password === data.password, {
    message: 'Las contraseñas no coinciden',
    path: ['re_password'],
  }),
});
