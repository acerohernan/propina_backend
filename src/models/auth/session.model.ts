import mongoose from 'mongoose';
import { UserDocument } from '../user/user.model';

export interface SessionInput {
  userId: UserDocument['_id'];
  userAgent: string;
}

export interface SessionDocument extends SessionInput, mongoose.Document {
  valid: boolean;
  createdAt: Date;
  updateAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
