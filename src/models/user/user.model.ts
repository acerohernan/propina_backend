import mongoose from 'mongoose';
import { CategoryDocument } from './category.model';

export interface UserInput {
  categoryId: CategoryDocument['_id'];
  status: number;
  email: string;
  password: string;
  username: string;
  name: string;
  profileImg: string | null;
  bannerImg: string | null;
  description: string | null;
  showDonors: boolean;
  hideTips: boolean;
  tipPrice: number;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  twitch: string | null;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    status: { type: Number, default: 1 },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    profileImg: { type: String, default: null },
    bannerImg: { type: String, default: null },
    description: { type: String },
    showTopDonors: { type: Boolean, default: true },
    hideTips: { type: Boolean, default: false },
    tipPrice: { type: Number, default: 5 },
    twitter: { type: String, default: null },
    facebook: { type: String, default: null },
    instagram: { type: String, default: null },
    youtube: { type: String, default: null },
    twitch: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export const userPrivateFields = ['password', 'createdAt', 'updatedAt'];

export default UserModel;
