import mongoose from 'mongoose';
import { UserDocument } from '../user/user.model';

export interface ForgotPasswordRequestDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  code: string;
}

const forgotPasswordRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: { type: String, required: true },
});

const ForgotPasswordRequestModel = mongoose.model(
  'ForgotPasswordRequest',
  forgotPasswordRequestSchema
);

export default ForgotPasswordRequestModel;
