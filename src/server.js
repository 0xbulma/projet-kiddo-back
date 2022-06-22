import 'dotenv/config';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './config/graphql/typeDefs/index__typeDefs.mjs';
import resolvers from './config/graphql/resolvers/index__resolvers.mjs';
import { typeDefs as scalarsTypedefs, resolvers as scalarsResolvers } from 'graphql-scalars';

import { connectToDB } from './config/database.mjs';

// console.log("toto");

// Initialisation des paramètres de l'application
async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  //typeDefs resolvers
  const schema = makeExecutableSchema({
    typeDefs: [typeDefs, ...scalarsTypedefs],
    resolvers: { ...resolvers, ...scalarsResolvers },
  });

  const server = new ApolloServer({
    context: () => 'FUTUR AUTHORIZATION',
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // Application des modifications de l'application
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Application des Middleware
  server.applyMiddleware({ app, path: '/graphql' });

  // Création d'une promesse de connexion
  await new Promise((resolve) => httpServer.listen(process.env.PORT, resolve));
  console.log(`[Serveur] Démarré avec succès : http://localhost:${process.env.PORT}`);

  // DB : Connexion
  connectToDB();
}

// Lancement de l'application
startApolloServer();
