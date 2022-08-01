import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface UserTextsInput {
  userId: string;
  title?: string;
  mainButton?: string;
  singularButton?: string;
  pluralButton?: string;
  afterPurchase?: string;
}

export interface UserTextsDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  title: string;
  mainButton: string;
  singularButton: string;
  pluralButton: string;
  afterPurchase: string;
}

const UserTextsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: '!Ayúdame con una propinita!' },
  mainButton: { type: String, default: 'Regálame una propinita' },
  singularButton: { type: String, default: 'Propinita' },
  pluralButton: { type: String, default: 'Propinitas' },
  afterPurchase: {
    type: String,
    default: '!Muchísimas gracias por el aporte!',
  },
});

const UserTextsModel = mongoose.model('UserText', UserTextsSchema);

export default UserTextsModel;
