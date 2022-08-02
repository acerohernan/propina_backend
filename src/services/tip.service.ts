import { FilterQuery } from 'mongoose';
import UserTipRequestModel, {
  UserTipRequestDocument,
  UserTipRequestInput,
} from '../models/tip/request.model';
import UserTipModel, {
  UserTipDocument,
  UserTipInput,
} from '../models/tip/tip.model';

//Tip
export async function getAllTipsFormUser(userId: string) {
  try {
    const tips = await UserTipModel.find({ userId }).lean();
    return tips;
  } catch (e: any) {
    throw new Error('Error al obtener las propinas en la base de datos.');
  }
}

export async function createTip(tip: UserTipInput) {
  try {
    const newTip = await UserTipModel.create(tip);
    return newTip;
  } catch (e: any) {
    console.error(e);
    throw new Error('Error al crear la propina en la base de datos.');
  }
}

//Tip request
export async function getAllTipsRequestFormUser(userId: string) {
  try {
    const tips = await UserTipRequestModel.find({ userId }).lean();
    return tips;
  } catch (e: any) {
    throw new Error(
      'Error al obtener las peticiones de propinas en la base de datos.'
    );
  }
}

export async function queryTipRequest(
  query: FilterQuery<UserTipRequestDocument>
) {
  try {
    const request = UserTipRequestModel.findOne(query).lean();
    return request;
  } catch (e: any) {
    throw new Error(
      'Error al obtener la petición de propina en la base de datos.'
    );
  }
}

export async function createTipRequet(tip: UserTipRequestInput) {
  try {
    const newTip = await UserTipRequestModel.create(tip);
    return newTip;
  } catch (e: any) {
    console.error(e);
    throw new Error(
      'Error al crear la peición de propina en la base de datos.'
    );
  }
}

export async function deleteTipRequest(query: FilterQuery<UserTipDocument>) {
  try {
    const deleted = await UserTipRequestModel.deleteOne(query);
    return deleted;
  } catch (e: any) {
    console.error(e);
    throw new Error(
      'Error al eliminar la petición de propina en la base de datos.'
    );
  }
}
