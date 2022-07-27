import fs from 'fs';
import path from 'path';

import CategoryModel, { CategoryInput } from '../models/category.model';
import logger from '../utils/logger';

async function buildCategories() {
  try {
    const data = await fs.promises.readFile(
      path.join(__dirname, '../../categories.json'),
      'utf-8'
    );

    const category = await CategoryModel.findOne({});

    if (!category) {
      const categories: Array<CategoryInput> = JSON.parse(data);

      categories.forEach(async (cat) => {
        const newCat = new CategoryModel(cat);
        await newCat.save();
      });

      logger.info('Categories created successfully');
    }
  } catch (e: any) {
    logger.error(`Error creating the categories`);
    logger.error(e.message ?? '');
    console.log(e);
  }
}

export default buildCategories;
