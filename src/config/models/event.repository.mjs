import mongoose from 'mongoose';

const schemaOptions = {
  versionKey: false,
};

const ExempleSchema = new mongoose.Schema(
  {
    name: String,
  },
  schemaOptions
);

export default mongoose.model('NAME', ExempleSchema, 'DBName');
