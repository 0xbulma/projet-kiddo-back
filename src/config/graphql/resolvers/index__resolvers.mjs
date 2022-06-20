import articleResolver from './article.resolvers.mjs';
import eventResolver from './event.resolvers.mjs';
import userResolver from './user.resolvers.mjs';

import { mergeResolvers } from '@graphql-tools/merge';

export default mergeResolvers([articleResolver, eventResolver, userResolver]);
