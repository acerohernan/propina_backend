import mongoose from 'mongoose';
import { PaymentMethodsDocument } from './methods.model';

export interface BcpPaymentInput {
  paymentMethodsId: PaymentMethodsDocument['_id'];
  accountNumber: string;
  cci: string;
  accountOwner: string;
}

export interface BcpPaymentDocument
  extends mongoose.Document,
    BcpPaymentInput {}

const BcpPaymentSchema = new mongoose.Schema({
  paymentMethodsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod',
  },
  accountNumber: { type: String, required: true },
  cci: { type: String, required: true },
  accountOwner: { type: String, required: true },
});

const BcpPaymentModel = mongoose.model('BcpPayment', BcpPaymentSchema);

export default BcpPaymentModel;
