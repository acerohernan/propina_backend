import mongoose from 'mongoose';
import { UserDocument } from '../user/user.model';

export interface UserTipRequestInput {
  userId: UserDocument['_id'];
  name?: string;
  contact?: string;
  message?: string;
  voucher: string;
  quantity: number;
}

export interface UserTipRequestDocument
  extends mongoose.Document,
    UserTipRequestInput {}

const UserTipRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: null },
  contact: { type: String, default: null },
  message: { type: String, default: null },
  quantity: { type: Number, required: true },
  voucher: { type: String, required: true },
});

const UserTipRequestModel = mongoose.model(
  'UserTipRequest',
  UserTipRequestSchema
);

export default UserTipRequestModel;
