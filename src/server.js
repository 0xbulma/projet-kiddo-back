import 'dotenv/config';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './config/graphql/typeDefs/index__typeDefs.mjs';
import resolvers from './config/graphql/resolvers/index__resolvers.mjs';
import { typeDefs as scalarsTypedefs, resolvers as scalarsResolvers } from 'graphql-scalars';

import { connectToDB } from './config/database.mjs';

// Initialisation des paramètres de l'application
async function startApolloServer() {
  const isProduction = process.env.NODE_ENV === 'PROD';

  const app = express();
  const httpServer = http.createServer(app);

  //typeDefs resolvers
  const schema = makeExecutableSchema({
    typeDefs: [typeDefs, ...scalarsTypedefs],
    resolvers: { ...resolvers, ...scalarsResolvers },
  });

  const server = new ApolloServer({
    context: (req) => req,
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
  });
  await server.start();

  // Application des modifications de l'application
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const corsOptions = {
    origin: [process.env.DEV_FRONT_URL, process.env.PROD_FRONT_URL, 'https://studio.apollographql.com'],
    credentials: true,
  };

  // Application des Middleware
  server.applyMiddleware({ app, cors: corsOptions });

  // Création d'une promesse de connexion
  await new Promise((resolve) => httpServer.listen(process.env.PORT, resolve));
  process.env.NODE_ENV === 'DEV'
    ? console.log(`[Serveur] Démarré avec succès : http://localhost:${process.env.PORT}/graphql`)
    : console.log(`[Serveur] Démarré avec succès :https://projet-kiddo.herokuapp.com/:${process.env.PORT}/graphql`);

  // DB : Connexion
  connectToDB();
}

// Lancement de l'application
startApolloServer();
