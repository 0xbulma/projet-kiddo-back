import userModel from '../models/user.model.mjs';

const POPULATE_USER =
  'pinned_events.event booked_events.event booked_events.event.categories finished_events.event friends_send_request.user friends_receive_request.user friends.user signalments.signalment signalments.sender reactions.type reactions.sender comments';

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

  async getAllByFilter(filter, array) {
    return await userModel
      .find({ [filter]: { $in: array } })
      .populate(POPULATE_USER)
      .exec();
  }

  async getById(id) {
    return await userModel.findOne({ _id: id }).populate(POPULATE_USER).exec();
  }

  async getByEmail(email) {
    return await userModel.findOne({ email }).populate(POPULATE_USER).exec();
  }

  //==========================================
  // Création et modification de l'utilisateur
  //==========================================
  async modifyUser(id, input) {
    return await userModel.findOneAndUpdate({ _id: id }, input, { new: true });
  }

  async modifyUsers(idsObjectArray, input) {
    return await userModel.updateMany({ _id: { $in: idsObjectArray } }, input);
  }

  async removeUser(id) {
    return await userModel.findOneAndRemove(id);
  }
}
