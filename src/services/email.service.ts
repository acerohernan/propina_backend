import nodemailer from 'nodemailer';
import logger from '../utils/logger';

import CONFIG from '../../config';

const {
  mailer: { user, pass },
} = CONFIG;

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user,
    pass,
  },
});

function sendEmail(
  to: string,
  subject: string,
  html: string = '<strong>Template nueva propina</strong>'
) {
  return transport.sendMail({
    from: '"Propina.pe" <propina.hacero.me>',
    to,
    subject,
    html,
  });
}

export async function sendEmailForNewTipRequest(
  email: string,
  name: string,
  quantity: number
) {
  try {
    const subject = `¡Te han enviado ${quantity} ${
      quantity > 1 ? 'propinas' : 'propina'
    }!`;

    const mail = await sendEmail(
      email,
      subject,
      `<span>Hola ${name}, nos complace informarte que una nueva donación ha llegado a tu cuenta. <br> Revisala en el siguiente link: </span> <a href="">Click me</a>`
    );
    logger.info('Message sent: ' + mail.messageId);
  } catch (e: any) {
    throw new Error('Error al enviar email por nueva solicitud de propina.');
  }
}
