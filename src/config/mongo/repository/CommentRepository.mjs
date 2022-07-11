import commentModel from '../models/comment.model.mjs';

const POPULATE_COMMENT = 'parent child target_user target_event target_article sender reactions.sender signalments.signalment signalments.sender';

export default class CommentRepository {
  //===============================================
  // Récupération des données liées à l'utilisateur
  //===============================================
  async getAll() {
    return await commentModel.find().populate(POPULATE_COMMENT).exec();
  }

  async getAllByIds(idsArray) {
    return await commentModel
      .find({ _id: { $in: idsArray } })
      .populate(POPULATE_COMMENT)
      .exec();
  }

  async getById(id) {
    return await commentModel.findOne({ _id: id }).populate(POPULATE_COMMENT).exec();
  }

  async getByTargetId(type, id) {
    switch (type) {
      case 0:
        return await commentModel.find({ target_user: id }).populate(POPULATE_COMMENT).exec();
      case 1:
        return await commentModel.find({ target_event: id }).populate(POPULATE_COMMENT).exec();
      case 2:
        return await commentModel.find({ target_article: id }).populate(POPULATE_COMMENT).exec();
    }
  }

  //==========================================
  // Création et modification de l'utilisateur
  //==========================================
  async createComment(input) {
    const comment = await commentModel.create(input);

    if (input.parent !== undefined && input.parent !== null) {
      const parentActualChilds = await commentModel.findOne({ _id: input.parent }).populate(POPULATE_COMMENT).exec();
      const finalChilds = [...parentActualChilds.child, comment._id];
      await commentModel.findOneAndUpdate({ _id: input.parent }, { child: finalChilds });
    }
    return await commentModel.findOne({ _id: comment._id }).populate(POPULATE_COMMENT).exec();
  }

  async modifyComment(id, input) {
    const comment = await commentModel.findOneAndUpdate({ _id: id }, input, { new: true });
    return commentModel.findOne({ _id: id }).populate(POPULATE_COMMENT).exec();
  }

  async removeComment(id) {
    return await commentModel.findOneAndRemove({ _id: id });
  }

  async removeComments(idsArray) {
    // EN CONSTRUCTION A VERIFIER LA STRUCTURE DES ARGUMENTS DE IDSARRAY
    return await commentModel.deleteMany({ _id: { $in: idsArray } });
  }
}
