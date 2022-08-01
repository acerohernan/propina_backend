import { omit } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import BcpPaymentModel, {
  BcpPaymentDocument,
  BcpPaymentInput,
} from '../models/payment/bcp.model';
import PaymentMethodsModel, {
  PaymentMethodsDocument,
  PaymentMethodsInput,
} from '../models/payment/methods.model';
import YapePaymentModel, {
  YapePaymentDocument,
  YapePaymentInput,
} from '../models/payment/yape.model';
import { UserDocument } from '../models/user/user.model';

export async function createPaymentMethods(payment: PaymentMethodsInput) {
  try {
    const newPayment = await PaymentMethodsModel.create(payment);
    return newPayment;
  } catch (e: any) {
    return new Error('Error al crear los métodos de pago en la base de datos.');
  }
}

export async function queryPaymentMethods(
  query: FilterQuery<PaymentMethodsDocument>,
  options: QueryOptions = {}
) {
  try {
    const newPayment = await PaymentMethodsModel.findOne(query, options);
    return newPayment;
  } catch (e: any) {
    console.log(e);
    throw new Error(
      'Error al obtener los métodos de pago de la base de datos.'
    );
  }
}

export async function getPaymentMethodFromUser(userId: UserDocument['_id']) {
  try {
    const payment = await PaymentMethodsModel.findOne({ userId });

    if (!payment) return null;

    const parseMethods = omit(payment.toJSON(), ['_id', 'userId', '__v']);

    const methods: any = {};

    if (parseMethods.yape) {
      const yape = await YapePaymentModel.findOne({
        paymentMethodsId: payment._id,
      });
      methods['yape'] = omit(yape?.toJSON(), [
        '_id',
        '__v',
        'paymentMethodsId',
      ]);
    }

    if (parseMethods.bcp) {
      const bcp = await BcpPaymentModel.findOne({
        paymentMethodsId: payment._id,
      });
      methods['bcp'] = omit(bcp?.toJSON(), ['_id', '__v', 'paymentMethodsId']);
    }

    if (Object.keys(methods).length === 0) return null;

    return methods;
  } catch (e: any) {
    throw new Error(
      'Ha ocurrido un error al obtener los métodos de pago de un usuario en la base de datos'
    );
  }
}

export async function updatePaymentMethods(
  query: FilterQuery<PaymentMethodsDocument>,
  update: UpdateQuery<PaymentMethodsDocument>
) {
  try {
    const updatedPayment = await PaymentMethodsModel.findOneAndUpdate(
      query,
      update
    );
    return updatedPayment;
  } catch (e: any) {
    return new Error(
      'Error al editar los métodos de pago en la base de datos.'
    );
  }
}

export async function createYapePayment(yape: YapePaymentInput) {
  try {
    const newYape = await YapePaymentModel.create(yape);
    return newYape;
  } catch (e: any) {
    return new Error('Error al agregar yape en la base de datos.');
  }
}

export async function queryYapePayment(
  query: FilterQuery<YapePaymentDocument>,
  options: QueryOptions = {}
) {
  try {
    const yape = await YapePaymentModel.findOne(query, options);
    return yape;
  } catch (e: any) {
    console.log(e);
    throw new Error('Error al obtener el yape de la base de datos.');
  }
}

export async function updateYapePayment(
  query: FilterQuery<YapePaymentDocument>,
  update: UpdateQuery<YapePaymentDocument>
) {
  try {
    const updatedYape = await YapePaymentModel.findOneAndUpdate(query, update);
    return updatedYape;
  } catch (e: any) {
    return new Error('Error al editar yape en la base de datos.');
  }
}

export async function createBcpPayment(bcp: BcpPaymentInput) {
  try {
    const newBcp = await BcpPaymentModel.create(bcp);
    return newBcp;
  } catch (e: any) {
    return new Error('Error al agregar la cuenta bcp en la base de datos.');
  }
}

export async function queryBcpPayment(
  query: FilterQuery<BcpPaymentDocument>,
  options: QueryOptions = {}
) {
  try {
    const bcp = await BcpPaymentModel.findOne(query, options);
    return bcp;
  } catch (e: any) {
    console.log(e);
    throw new Error('Error al obtener la cuenta bcp de la base de datos.');
  }
}

export async function updateBcpPayment(
  query: FilterQuery<BcpPaymentDocument>,
  update: UpdateQuery<BcpPaymentDocument>
) {
  try {
    const updatedBcp = await BcpPaymentModel.findOneAndUpdate(query, update);
    return updatedBcp;
  } catch (e: any) {
    return new Error('Error al editar la cuenta bcp en la base de datos.');
  }
}
