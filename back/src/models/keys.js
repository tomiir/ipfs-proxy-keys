import { schema as Schema, mongoose } from '../db.js';

const schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  value: { type: String, required: true },
  active: { type: Boolean, default: false },
});

export default mongoose.model('Key', schema, 'keys');
