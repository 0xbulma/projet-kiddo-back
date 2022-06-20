import totoResolver from './toto.resolver.mjs';

import { mergeResolvers } from '@graphql-tools/merge';

export default mergeResolvers([totoResolver]);
