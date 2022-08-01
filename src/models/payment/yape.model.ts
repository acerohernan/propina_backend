import mongoose from 'mongoose';
import { PaymentMethodsDocument } from './methods.model';

export interface YapePaymentInput {
  paymentMethodsId: PaymentMethodsDocument['_id'];
  phone: string;
  qr: string;
  ownerName: string;
}

export interface YapePaymentDocument
  extends mongoose.Document,
    YapePaymentInput {}

const YapePaymentSchema = new mongoose.Schema({
  paymentMethodsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod',
  },
  phone: { type: String, required: true },
  qr: { type: String, required: true },
  ownerName: { type: String, required: true },
});

const YapePaymentModel = mongoose.model('YapePayment', YapePaymentSchema);

export default YapePaymentModel;
