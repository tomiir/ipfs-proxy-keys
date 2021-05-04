import { schema as Schema, mongoose } from '../db.js';

const schema = new Schema({
  keyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Key' },
  url: String,
  method: String,
  timestamp: Date,
  size: Number
});

export default mongoose.model('Request', schema, 'requests');
