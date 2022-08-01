import mongoose from 'mongoose';

export interface CategoryInput {
  name: string;
  img: string;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>(
  'Category',
  categorySchema
);

export default CategoryModel;
