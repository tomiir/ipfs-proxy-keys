import Key from '../models/keys.js';
import { endRequest, catchRequest } from '../helpers/request.js';
import { entityAlreadyExists } from '../errors.js';


export const getKeys = async (req, res) => {
  const { id } = req.user;
  const keys = await Key.find({ userId: id });
  return endRequest({ response: keys, code: 200, res });
};

export const createKey = async (req, res) => {
  const { user, body } = req;
  const sameKey = await Key.findOne({ userId: user.id, value: body.value });
  if (sameKey) {
    return catchRequest({
      err: entityAlreadyExists('A key with that value already exists'),
      code: 400,
      res,
    });
  }
  const key = new Key({ ...body, userId: user.id });
  try {
    await key.validate();
  } catch (err) {
    return catchRequest({
      err: { code: 400, message: err.message },
      res,
    });
  }

  return key.save()
    .then((response) => endRequest({
      response,
      code: 201,
      res,
    }))
    .catch((err) => catchRequest({
      err, res, message: 'Error saving Case',
    }));
};
