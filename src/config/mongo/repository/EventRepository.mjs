import eventModel from '../models/event.model.mjs';

export default class EventRepository {
  // Récupération des données liées à l'évènement
  async getEvents(fields) {
    return await eventModel.find().select(fields);
  }

  async getEvent(eventId, fields) {
    return await eventModel
      .findById(eventId)
      .select(fields)
   // .populate('Users', fields)
   // .exec();
  }

  // Création et modification de l'évènement
  async createEvent(eventInput, fields) {
    const event = await eventModel.create(eventInput);

    return await eventModel.findById(event._id)
    .select(fields)
 // .populate('Users', fields)
 // .exec();
  }

  async updateEvent(eventId, eventInput, fields) {
    return await eventModel
      .findByIdAndUpdate(eventId, eventInput, {
        new: true,
      })
      .select(fields)
  //  .populate('Users', fields)
  //  .exec();
  }

  async deleteEvent(eventId) {
    return await eventModel.findByIdAndDelete(eventId);
  }
}
