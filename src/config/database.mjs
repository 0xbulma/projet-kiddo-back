import mongoose from 'mongoose';

const CONNECT_TIMEOUT_MS = 3000;
const SOCKET_TIMOUT_MS = 20000;

export function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      connectTimeoutMS: CONNECT_TIMEOUT_MS,
      socketTimeoutMS: SOCKET_TIMOUT_MS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('[MongoDB] Connection reussie !');
    })
    .catch((err) => console.log('[MongoDB] Erreur lors de la connexion : ', err));
}
