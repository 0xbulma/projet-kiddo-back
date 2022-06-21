import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typeDefs = loadFilesSync('.', {
  extensions: ['graphql'],
  recursive: true,
});

console.log('Toto');
export default mergeTypeDefs([typeDefs]);
