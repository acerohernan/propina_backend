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
    showTopDonors: { type: String, default: true },
    hideTips: { type: String, default: false },
    tipPrice: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
