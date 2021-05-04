import { schema as Schema, mongoose } from '../utils/db.js';

const schema = new Schema({
  email: { type: String, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  password: String,
});

export default mongoose.model('User', schema, 'users');
