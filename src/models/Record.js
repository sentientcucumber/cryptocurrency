import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  exchange: {
    type: String,
    required: true
  },
  market: {
    type: String,
    required: true
  },
  ask: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: false
  }
}, {
  collection: 'records'
});

export default mongoose.model('Record', recordSchema);
