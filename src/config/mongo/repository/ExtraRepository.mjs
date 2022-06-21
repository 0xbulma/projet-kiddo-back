import badgeSchema from '../models/extra.model.mjs';

export default class ExtraRepository {
  async createBadge(inputs) {
    return await badgeSchema.create(inputs);
  }
}
