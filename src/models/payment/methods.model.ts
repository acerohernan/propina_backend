import mongoose from 'mongoose';
import { UserDocument } from '../user/user.model';

export interface PaymentMethodsInput {
  userId: UserDocument['_id'];
  yape?: boolean;
  bcp?: boolean;
}

export interface PaymentMethodsDocument
  extends mongoose.Document,
    PaymentMethodsInput {}

const PaymentMethodsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  yape: { type: Boolean, default: false },
  bcp: { type: Boolean, default: false },
});

const PaymentMethodsModel = mongoose.model(
  'PaymentMethod',
  PaymentMethodsSchema
);

export default PaymentMethodsModel;
