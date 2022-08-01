import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import UserTextsModel, {
  UserTextsDocument,
  UserTextsInput,
} from '../models/user/texts.model';
import UserModel, { UserDocument, UserInput } from '../models/user/user.model';

export async function createUser(user: UserInput) {
  try {
    const newUser = await UserModel.create(user);
    return newUser.toJSON();
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

    return user?.toJSON();
  } catch (e) {
    console.log(e);
    throw new Error('Error al obtener el usuario de la base de datos');
  }
}

export async function updateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  try {
    const user = await UserModel.findOneAndUpdate(query, update);
    return user?.toJSON();
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

    return newUserTexts.toJSON();
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
    return userTexts?.toJSON();
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
    return userText?.toJSON();
  } catch (e: any) {
    console.log(e);
    throw new Error(
      'Error al actualizar los textos del usuario en la base de datos'
    );
  }
}
