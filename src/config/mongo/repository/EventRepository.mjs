import eventModel from '../models/event.model.mjs';

const POPULATE_EVENT =
  'main_owner co_owners group_participants.user_id categories restrictions signalments.type signalments.sender_id reactions.type reactions.sender_id comments';

export default class EventRepository {
  // Récupération des données liées à l'évènement
  async getEvents(
    first = 12,
    offset = 0,
    filterKey = null,
    filter = null,
    geoloc = null,
    maxDist = null
  ) {
    return await eventModel
      .find({ [filterKey]: filter })
      .skip(parseInt(offset))
      .limit(parseInt(first))
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getCountByComplexSearch(
    minDate,
    filterKey,
    filter,
    searchInput,
    lng,
    lat,
    maxDistMeters,
    minChildAge,
    maxChildAge,
    price,
    status,
    restrictionsArray
  ) {
    return await eventModel.count({
      [filterKey]: filter,
      $or: [
        {
          'content.title': { $regex: new RegExp(`.*${searchInput}.*`, 'i') },
        },
        {
          'content.subtitle': {
            $regex: new RegExp(`.*${searchInput}.*`, 'i'),
          },
        },
        {
          'content.highlighted_message.title': {
            $regex: new RegExp(`.*${searchInput}.*`, 'i'),
          },
        },
        {
          'content.highlighted_message.message': {
            $regex: new RegExp(`.*${searchInput}.*`, 'i'),
          },
        },
      ],
      status: { $regex: `.*${status}.*` },
      'event_date.start': { $gte: minDate },
      minChildAge: { $gte: minChildAge },
      maxChildAge: { $lte: maxChildAge },
      // restrictions: { $in: restrictionsArray },
    });
  }

  async getEventsByComplexSearch(
    first,
    offset,
    dateOrder,
    minDate,
    filterKey,
    filter,
    searchInput,
    lng,
    lat,
    maxDistMeters,
    minChildAge,
    maxChildAge,
    price,
    status,
    restrictionsArray
  ) {
    return await eventModel
      .find({
        [filterKey]: filter,
        $or: [
          {
            'content.title': { $regex: new RegExp(`.*${searchInput}.*`, 'i') },
          },
          {
            'content.subtitle': {
              $regex: new RegExp(`.*${searchInput}.*`, 'i'),
            },
          },
          {
            'content.highlighted_message.title': {
              $regex: new RegExp(`.*${searchInput}.*`, 'i'),
            },
          },
          {
            'content.highlighted_message.message': {
              $regex: new RegExp(`.*${searchInput}.*`, 'i'),
            },
          },
        ],
        status: { $regex: `.*${status}.*` },
        'event_date.start': { $gte: minDate },
        minChildAge: { $gte: minChildAge },
        maxChildAge: { $lte: maxChildAge },
        // restrictions: { $in: restrictionsArray },
      })
      .sort({ 'event_date.start': dateOrder })
      .skip(offset)
      .limit(first)
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getMatch() {
    return await eventModel.aggregate([
      {
        $match: {
          categories: ObjectId('62bda67384cf824356e890e0'),
        },
      },
    ]);
  }

  async getAllbyIds(idsArray) {
    return await eventModel
      .find({ _id: { $in: idsArray } })
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getAllByFilter(filter, array) {
    return await eventModel
      .find({ [filter]: { $in: array } })
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getEventById(eventId) {
    return await eventModel.findOne(eventId).populate(POPULATE_EVENT).exec();
  }

  // Création et modification de l'évènement
  async createEvent(eventInput, fields) {
    return await eventModel.create(eventInput);
  }

  async modifyEvent(eventId, eventInput, fields) {
    return await eventModel
      .findOneAndUpdate(eventId, eventInput, { new: true })
      .populate(POPULATE_EVENT)
      .exec();
  }

  async removeEvent(eventId) {
    return await eventModel.findOneAndRemove(eventId);
  }

  async removeEvents(idsArray) {
    return await eventModel.deleteMany({ _id: { $in: idsArray } });
  }
}
