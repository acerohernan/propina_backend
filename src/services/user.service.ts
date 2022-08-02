import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import CategoryModel, { CategoryDocument } from '../models/user/category.model';
import UserTextsModel, {
  UserTextsDocument,
  UserTextsInput,
} from '../models/user/texts.model';
import UserModel, { UserDocument, UserInput } from '../models/user/user.model';

export async function createUser(user: UserInput) {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (e) {
    console.log(e);
    throw new Error('Error al guardar el usuario en la base de datos');
  }
}

export async function queryUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = {}
) {
  try {
    const user = await UserModel.findOne(query, options);
    return user;
  } catch (e) {
    console.log(e);
    throw new Error('Error al obtener el usuario de la base de datos');
  }
}

export async function queryUsers(
  query: FilterQuery<UserDocument>,
  limit: number = 10,
  options: QueryOptions<UserDocument> = {}
) {
  try {
    const users = await UserModel.find(query, options).limit(limit);
    return users;
  } catch (e) {
    console.log(e);
    throw new Error('Error al obtener los usuarios de la base de datos');
  }
}

export async function updateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  try {
    const user = await UserModel.findOneAndUpdate(query, update);
    return user;
  } catch (e: any) {
    console.log(e);
    throw new Error('Error al actualizar el usuario en la base de datos');
  }
}

export async function createUserTexts(userTexts: UserTextsInput) {
  try {
    const texts: UserTextsInput = {
      userId: userTexts.userId,
      title: userTexts.title ?? '!Ayúdame con una propinita!',
      mainButton: userTexts.mainButton ?? 'Regálame propinita',
      singularButton: userTexts.singularButton ?? 'Propinita',
      pluralButton: userTexts.pluralButton ?? 'Propinitas',
      afterPurchase:
        userTexts.afterPurchase ?? '¡Muchísimas gracias por la propinita!',
    };

    const newUserTexts = await UserTextsModel.create(texts);

    return newUserTexts;
  } catch (e) {
    console.log(e);
    throw new Error(
      'Error al guardar los textos de usuario en la base de datos'
    );
  }
}

export async function queryUserTexts(
  query: FilterQuery<UserTextsDocument>,
  options: QueryOptions = {}
) {
  try {
    const userTexts = await UserTextsModel.findOne(query, options);
    return userTexts;
  } catch (e) {
    console.log(e);
    throw new Error(
      'Error al obtener los textos del usuario en la base de datos'
    );
  }
}

export async function updateUserTexts(
  query: FilterQuery<UserTextsDocument>,
  update: UpdateQuery<UserTextsDocument>
) {
  try {
    const userText = await UserTextsModel.findOneAndUpdate(query, update);
    return userText;
  } catch (e: any) {
    console.log(e);
    throw new Error(
      'Error al actualizar los textos del usuario en la base de datos'
    );
  }
}

export async function getAllUserCategories() {
  try {
    const categories = CategoryModel.find().lean();
    return categories;
  } catch (e: any) {
    throw new Error(
      'Error al obtener todas las categorías de la base de datos.'
    );
  }
}

export async function queryCategory(query: FilterQuery<CategoryDocument>) {
  try {
    const cat = await CategoryModel.findOne(query);
    return cat;
  } catch (e) {
    throw new Error('Error al obtener la categoría en la base de datos.');
  }
}
