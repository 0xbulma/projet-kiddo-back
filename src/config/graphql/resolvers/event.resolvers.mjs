import EventRepository from '../../mongo/repository/EventRepository.mjs';
import getFields from '../../../utils/getFields.mjs';

const eventRepository = new EventRepository();

export default {
  Query: {
    events: async (
      parent,
      { first, offset, filterKey, filter, geoloc, maxDist },
      context,
      info
    ) => {
      return await eventRepository.getEvents(
        first,
        offset,
        filterKey?.toLowerCase().trim(),
        filter?.toLowerCase().trim(),
        geoloc,
        maxDist
      );
    },

    eventsComplexQuery: async (
      parent,
      {
        first = 12,
        offset = 0,
        filterKey = null,
        filter = null,
        searchInput = null,
        lng = 0,
        lat = 0,
        maxDistMeters = 200000,
        minChildAge = 0,
        maxChildAge = 12,
        isPriced,
        restrictionsArray = [''],
      },
      context,
      info
    ) => {
      const response = await eventRepository.getEventsByComplexSearch(
        parseInt(first),
        parseInt(offset),
        filterKey?.toLowerCase().trim(),
        filter?.toLowerCase().trim(),
        searchInput?.toLowerCase().trim(),
        lng,
        lat,
        maxDistMeters,
        minChildAge,
        maxChildAge,
        isPriced,
        restrictionsArray,
      );
      return response;
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
