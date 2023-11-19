import mongoose, { Schema } from 'mongoose';

const translatorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  surname: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  clients: {
    type: [
      {
        name: String,
        surname: String,
        translators: [String],
        suspended: Boolean,
      },
    ],
  },
  statistics: [
    {
      year: String,
      months: [
        [
          {
            id: String,
            clients: [
              {
                id: String,
                chats: Number,
                letters: Number,
                dating: Number,
                virtualGiftsSvadba: Number,
                virtualGiftsDating: Number,
                photoAttachments: Number,
                phoneCalls: Number,
                penalties: Number,
                comments: String,
              },
            ],
          },
        ],
      ],
    },
  ],
  edited: Boolean,
  suspended: {
    status: Boolean,
    time: String,
  },
  personalPenalties: [
    {
      date: String,
      amount: String,
      description: String,
      _id: String,
    },
  ],
  email: {
    type: String,
    lowercase: true,
    required: false,
  },
  password: {
    type: String,
    lowercase: true,
    required: false,
  },
  wantsToReceiveEmails: Boolean,
});

const Translator =
  mongoose.models.Translator || mongoose.model('Translator', translatorSchema);

export default Translator;
