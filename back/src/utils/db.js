import mongooseLib from 'mongoose';

export const mongoose = mongooseLib;

if (process.env.NODE_ENV !== 'testing') {
  mongoose.set('debug', true);
}

export const initDatabase = async () => {
  mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, authSource: 'admin' });
  return mongoose;
};

export const schema = mongoose.Schema;
