import userModel from '../models/user.model.mjs';

export default class UserRepository {
  //===============================================
  // Récupération des données liées à l'utilisateur
  //===============================================
  async getAll() {
    return await userModel.find();
  }

  async getById(id) {
    return await userModel.findById(id);
  }

  //==========================================
  // Création et modification de l'utilisateur
  //==========================================
  async createUser(input) {
    return await userModel.create(input);
  }

  async modifyUser(id, input) {
    return await userModel.findByIdAndUpdate(id, input, { new: true });
  }

  async removeUser(id) {
    return await userModel.findOneAndRemove({_id : id});
  }
}
