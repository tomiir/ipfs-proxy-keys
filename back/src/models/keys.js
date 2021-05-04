import { schema as Schema, mongoose } from '../utils/db.js';

const schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  value: { type: String, required: true },
  active: { type: Boolean, default: false },
  requests: [{
    url: String,
    method: String,
    timestamp: Date,
    size: Number,
  }],
});

export default mongoose.model('Key', schema, 'keys');
