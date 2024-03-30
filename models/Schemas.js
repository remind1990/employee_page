import mongoose from 'mongoose';

const SuspendedStatusSchema = new mongoose.Schema({
  status: Boolean,
  time: Date,
});

const PersonalPenaltiesSchema = new mongoose.Schema({
  translator: { type: mongoose.Schema.Types.ObjectId, ref: 'Translator' },
  dateTimeId: Date,
  amount: Number,
  description: String,
});

export const BalanceDaySchema = new mongoose.Schema({
  dateTimeId: Date,
  translator: { type: mongoose.Schema.Types.ObjectId, ref: 'Translator' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  statistics: {
    chats: Number,
    letters: Number,
    dating: Number,
    virtualGiftsSvadba: Number,
    virtualGiftsDating: Number,
    photoAttachments: Number,
    phoneCalls: Number,
    penalties: Number,
    comments: String,
    voiceMessages: Number,
  },
});

export const TranslatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  surname: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
  statistics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BalanceDay' }],
  edited: Boolean,
  suspended: SuspendedStatusSchema,
  personalPenalties: [PersonalPenaltiesSchema],
  email: {
    type: String,
    lowercase: true,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  wantsToReceiveEmails: Boolean,
});

export const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  bankAccount: { type: String, required: true },
  instagramLink: { type: String, required: true },
  suspended: { type: Boolean, default: false },
  svadba: {
    login: { type: String, required: false },
    password: { type: String, required: false },
  },
  dating: {
    login: { type: String, required: false },
    password: { type: String, required: false },
  },
  translators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Translator' }],
  image: { type: String, required: false },
});
