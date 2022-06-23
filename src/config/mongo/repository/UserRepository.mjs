import userModel from '../models/user.model.mjs';

//
const POPULATE_USER =
  'pinned_events.event_id booked_events.event_id finished_events.event_id friends_send_request.user_id friends_receive_request.user_id friends.user_id signalments.type signalments.sender_id reactions.type reactions.sender_id comments';

export default class UserRepository {
  //===============================================
  // Récupération des données liées à l'utilisateur
  //===============================================
  async getAll() {
    return await userModel.find().populate(POPULATE_USER).exec();
  }

  async getAllbyIds(idsArray) {
    return await userModel
      .find({ _id: { $in: idsArray } })
      .populate(POPULATE_USER)
      .exec();
  }

  async getAllByFilter(filter, array){
    return await userModel
    .find({ [filter]: { $in: array } })
    .populate(POPULATE_USER)
    .exec();
  }

  async getById(id) {
    return await userModel.findOne(id).populate(POPULATE_USER).exec();
  }

  //==========================================
  // Création et modification de l'utilisateur
  //==========================================
  async createUser(input) {
    return await userModel.create(input);
  }

  async modifyUser(id, input) {
    return await userModel.findOneAndUpdate(id, input, { new: true });
  }

  async modifyUsers(idsObjectArray, input) {
    return await userModel.updateMany({ _id: { $in: idsObjectArray } }, input);
  }

  async removeUser(id) {
    return await userModel.findOneAndRemove(id);
  }
}
