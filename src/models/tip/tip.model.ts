import mongoose from 'mongoose';
import { UserDocument } from '../user/user.model';

export interface UserTipInput {
  userId: UserDocument['_id'];
  name?: string;
  contact?: string;
  message?: string;
  quantity: number;
  response?: string;
}

export interface UserTipDocument extends mongoose.Document, UserTipInput {}

const UserTipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: '' },
  contact: { type: String, default: '' },
  message: { type: String, default: '' },
  quantity: { type: Number, required: true },
  response: { type: String, default: '' },
});

const UserTipModel = mongoose.model('UserTip', UserTipSchema);

export default UserTipModel;
