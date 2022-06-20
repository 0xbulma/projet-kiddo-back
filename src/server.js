import 'dotenv/config';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { typeDefs as scalarsTypedefs, resolvers as scalarsResolvers } from 'graphql-scalars';

import typeDefs from './config/graphql/typedefs/index__typedefs.mjs';
import resolvers from './config/graphql/resolvers/index__resolvers.mjs';

import { connectToDB } from './config/database.mjs';

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
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // Application des modifications de l'application
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Application des Middleware
  server.applyMiddleware({ app, path: '/' });

  // Création d'une promesse de connexion
  await new Promise((resolve) => httpServer.listen(process.env.BACK_PORT, resolve));
  console.log(`[Serveur] Démarré avec succès : http://localhost:${process.env.BACK_PORT}`);

  // DB : Connexion
  connectToDB();
}

// Lancement de l'application
startApolloServer();
