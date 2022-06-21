import mongoose from 'mongoose';
import * as check from 'validator';

//TODO


const errorMessage = {
  title: 'Title is required',
  // TODO  Ajouter les required pour les autres champs
};



const schemaOptions = {
  versionKey: false,
  timestamps: { created_at: 'created_at', updated_at: 'updated_at' },
};

const EventSchema = new mongoose.Schema(
  {
    drafted_at: { type: Date, default: Date.now },
    published_at: { type: Date, default: Date.now },
    main_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    co_owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    content: {
      title: { type: String, required: [true, errorMessage.title] },
      subtitle: { type: String },
      description: { type: String },
      highlighted_message: [
        {
          title: { type: String },
          message: { type: String },
        },
      ],
    },
    content_media: {
      photos_url: [
        {
          type: String,
          validate: {
            validator: function (value) {
              return check.isURL(value);
            },
            message: props => `${props.value} n'est pas une URL valide!`,
          },
        },
      ],
      photo_main_url: {
        type: String,
        validate: {
          validator: function (value) {
            return check.isURL(value);
          },
          message: props => `${props.value} n'est pas une URL valide!`,
        },
      },
      video_url: {
        type: String,
        validate: {
          validator: function (value) {
            return check.isURL(value);
          },
          message: props => `${props.value} n'est pas une URL valide!`,
        },
      },
    },
    group_size: { type: Number, default: 0 },
    group_participants: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        booked_at: { type: Date, default: Date.now },
        group_detail: [
          {
            isChild: { type: Boolean, default: false },
            name: { type: String },
            age: { type: Number },
          },
        ],
      },
    ],
    price: { type: Number, default: 0 },
    event_date: {
      start: { type: Date, default: Date.now },
      end: { type: Date, default: Date.now },
    },

    // TODO Ajouter les valeurs ENUM du fichier constante

    status: { type: String, enum: ['TOTO'] },
    address: {
      city: { type: String },
      zip_code: {
        type: String,
        validate: {
          validator: function (value) {
            return check.isPostalCode(value, any);
          },
          message: props => `${props.value} n'est pas un code postal valide!`,
        },
      },
      address_line: { type: String },
      address_line_2: { type: String },
    },
    gps: {
      lat: {
        type: Number,
        validate: {
          validator: function (value) {
            return check.isLatLong(value);
          },
          message: props => `${props.value} n'est pas une latitude valide!`,
        },
      },
      lng: {
        type: Number,
        validate: {
          validator: function (value) {
            return check.isLatLong(value);
          },
          message: props => `${props.value} n'est pas une longitude valide!`,
        },
      },
    },
    filters: [{ type: String }],
    categories: [
      // TODO Ajouter les valeurs ENUM du fichier constante
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        name: { type: String, enum: ['TOTO'] },
      },
    ],
    restrictions: [
      // TODO Ajouter les valeurs ENUM du fichier constante
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restriction' },
        name: { type: String, enum: ['TOTO'] },
      },
    ],
    highlighted: { type: Boolean, default: false },
    signalments: [
      {
        // TODO Ajouter les valeurs ENUM du fichier constante
        type: { type: String, enum: ['TOTO'] },
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        signaled_at: { type: Date, default: Date.now },
      },
    ],
    reactions: [
      {
        // TODO Ajouter les valeurs ENUM du fichier constante
        type: { type: String, enum: ['TOTO'] },
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    comments: [
      {
        _id: { type: String },
        child_id: { type: String },
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        created_at: { type: Date, default: Date.now },
        modified_at: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: Date.now },
        event_review : { type : Boolean, default : false },
        content: {
          title: { type: String },
          message: { type: String },
          photos_url: [
            {
              type: String,
              validate: {
                validator: function (value) {
                  return check.isURL(value);
                },
                message: props => `${props.value} n'est pas une URL valide!`,
              },
            },
          ],
        },
        reactions: [
          {
            // TODO Ajouter les valeurs ENUM du fichier constante
            type: { type: String, enum: ['TOTO'] },
            sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          },
        ],
        pinned : { type : Boolean, default : false },
        signalments: [
          {
            // TODO Ajouter les valeurs ENUM du fichier constante
            type: { type: String, enum: ['TOTO'] },
            sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            signaled_at: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  },
  schemaOptions
);

export default mongoose.model('Event', EventSchema, 'Events');
