import userModel from '../models/user.model.mjs';

export default class UserRepository {
  // Récupération des données liées à l'utilisateur
  //getUser

  // Création et modification de l'utilisateur
  async createUser(userInput) {
    return await userModel.create(userInput);
  }
}
