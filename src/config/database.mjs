import mongoose from 'mongoose';

export function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      connectTimeoutMS: 3000,
      socketTimeoutMS: 20000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('[MongoDB] Connection reussie !');
    })
    .catch((err) => console.log('[MongoDB] Erreur lors de la connexion : ', err));
}
