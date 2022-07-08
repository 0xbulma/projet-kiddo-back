import EventRepository from '../../mongo/repository/EventRepository.mjs';
import getFields from '../../../utils/getFields.mjs';

const eventRepository = new EventRepository();

export default {
  Query: {
    events: async (parent, { first, offset, filterKey, filter, geoloc, maxDist }, context, info) => {
      return await eventRepository.getEvents(first, offset, filterKey?.toLowerCase().trim(), filter?.toLowerCase().trim(), geoloc, maxDist);
    },

    eventsComplexQuery: async (parent, { input }, context, info) => {
      let inputObject = {};
      
      if (!input) {
        input = inputObject;
      } else {
        inputObject = input;
      }
      if (!inputObject?.minDate) {
        inputObject.minDate = 0;
      }
      if (!inputObject?.minDraftedAt) {
        inputObject.minDraftedAt = 0;
      }
      if (!inputObject?.minPublishedAt) {
        inputObject.minPublishedAt = 0;
      }
      if (inputObject?.searchInput) {
        inputObject.searchInput?.toLowerCase().trim();
      }
      if (!inputObject?.searchInput) {
        inputObject.searchInput = '';
      }
      if (!inputObject?.minChildAge) {
        inputObject.minChildAge = 0;
      }
      if (!inputObject?.maxChildAge) {
        inputObject.maxChildAge = 12;
      }
      if (!inputObject?.status) {
        inputObject.status = '';
      }
      if (!inputObject?.first) {
        inputObject.first = 12;
      }
      if (!inputObject?.offset) {
        inputObject.offset = 0;
      }
      if (!inputObject?.maxDistMeters) {
        inputObject.maxDistMeters = 200000;
      }
      const count = await eventRepository.getCountByComplexSearch(inputObject);
      const response = await eventRepository.getEventsByComplexSearch(inputObject);
      return { count: count, results: response };
    },

    event: async (parent, { id }, context, info) => {
      return await eventRepository.getEventById(id);
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
