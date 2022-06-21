import * as extraSchema from '../models/extra.model.mjs';

export default class ExtraRepository {
  async createBadge(inputs) {
    return await extraSchema.badgeSchema.create(inputs);
  }
}
