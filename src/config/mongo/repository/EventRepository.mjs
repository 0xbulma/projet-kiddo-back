import eventModel from '../models/event.model.mjs';

const POPULATE_EVENT =
  'main_owner co_owners group_participants.user categories restrictions signalments.signalment signalments.sender reactions.type reactions.sender_id comments';

export default class EventRepository {
  // Récupération des données liées à l'évènement

  complexQueryConstructor(input) {
    let query = {
      // restrictions: { $in: restrictionsArray },
    };
    if (input?.categories) {
      query['categories'] = input.categories;
    }
    if (input.minChildAge > 0) {
      query['minChildAge'] = { $gte: input.minChildAge };
    }
    if (input.maxChildAge < 12) {
      query['maxChildAge'] = { $lte: input.maxChildAge };
    }
    if (input.searchInput.length > 0) {
      query['$or'] = [
        {
          'content.title': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
        {
          'content.subtitle': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
        {
          'content.highlighted_message.title': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
        {
          'content.highlighted_message.message': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
        {
          'adress.city': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
        {
          'adress.zip_code': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
        {
          'adress.adress_line': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
        {
          'adress.adress_line2': {
            $regex: new RegExp(`.*${input.searchInput}.*`, 'i'),
          },
        },
      ];
    }
    if (input.status.length > 0) {
      query['status'] = { $regex: `.*${input.status}.*` };
    }
    if (input.minDate !== 0) {
      query['event_date.start'] = { $gte: input.minDate };
    }
    if (input.minDraftedAt !== 0) {
      query['drafted_at'] = { $gte: input.minDraftedAt };
    }
    if (input.minPublishedAt !== 0) {
      query['published_at'] = { $gte: input.minPublisheddAt };
    }
    return query;
  }

  async getEvents(first = 12, offset = 0, filterKey = null, filter = null, geoloc = null, maxDist = null) {
    return await eventModel
      .find({ [filterKey]: filter })
      .skip(parseInt(offset))
      .limit(parseInt(first))
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getCountByComplexSearch(input) {
    return await eventModel.count(this.complexQueryConstructor(input));
  }

  async getEventsByComplexSearch(input) {
    let queryOrder = {};
    if (input.dateOrder) {
      queryOrder['event_date.start'] = input.dateOrder;
    }
    if (input.publishedOrder) {
      queryOrder['published_at'] = input.publishedOrder;
    }

    return await eventModel
      .find(this.complexQueryConstructor(input))
      .sort(queryOrder)
      .skip(input.offset)
      .limit(input.first)
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
    return await eventModel.findOne({ _id: eventId }).populate(POPULATE_EVENT).exec();
  }

  // Création et modification de l'évènement
  async createEvent(eventInput, fields) {
    return await eventModel.create(eventInput);
  }

  async modifyEvent(eventId, eventInput, fields) {
    return await eventModel.findOneAndUpdate(eventId, eventInput, { new: true }).populate(POPULATE_EVENT).exec();
  }

  async removeEvent(eventId) {
    return await eventModel.findOneAndRemove(eventId);
  }

  async removeEvents(idsArray) {
    return await eventModel.deleteMany({ _id: { $in: idsArray } });
  }
}
