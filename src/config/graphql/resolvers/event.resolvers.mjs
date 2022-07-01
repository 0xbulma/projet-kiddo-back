import EventRepository from '../../mongo/repository/EventRepository.mjs';
import getFields from '../../../utils/getFields.mjs';

const eventRepository = new EventRepository();

export default {
  Query: {
    events: async (parent, { first, offset, filterKey, filter, geoloc, maxDist }, context, info) => {
      return await eventRepository.getEvents(
        parseInt(first),
        parseInt(offset),
        filterKey?.toLowerCase().trim(),
        filter?.toLowerCase().trim(),
        geoloc,
        maxDist
      );
    },

    event: async (parent, { id }, context, info) => {
      return await eventRepository.getEventById({ id });
    },
  },

  Mutation: {
    createEvent: async (parent, { input }, ctx, info) => {
      const fields = getFields(info);
      return await eventRepository.createEvent(input, fields);
    },

    modifyEvent: async (parent, { id, input }, ctx, info) => {
      const fields = getFields(info);
      return await eventRepository.modifyEvent(id, input, fields);
    },

    removeEvent: async (parent, { id }, ctx, info) => {
      return await eventRepository.removeEvent(id);
    },
  },
};
