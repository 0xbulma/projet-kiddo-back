import userModel from '../models/user.model.mjs';

const POPULATE_USER = 'signalments reactions comments';

export default class UserRepository {
  //===============================================
  // Récupération des données liées à l'utilisateur
  //===============================================
  async getAll() {
    return await userModel.find().populate(POPULATE_USER).exec();
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

  async removeUser(id) {
    return await userModel.findOneAndRemove(id);
  }
}
