/* eslint-disable no-underscore-dangle */
import Key from '../models/keys.js';
import { endRequest, catchRequest } from '../helpers/request.js';
import { entityAlreadyExists, entityNotFound } from '../errors.js';


export const getKeys = async (req, res) => {
  const { id } = req.user;
  const keys = await Key.find({ userId: id });
  return endRequest({ response: keys, code: 200, res });
};

export const updateKey = async (req, res) => {
  const { params, body, user } = req;
  try {
    const sameKey = await Key.findOne({ userId: user._id, value: body.value });
    if (sameKey) {
      return catchRequest({
        err: entityAlreadyExists('A key with that value already exists'),
        code: 400,
        res,
      });
    }
    const key = await Key.findOne({ _id: params.id });
    if (!key) {
      return catchRequest({
        err: entityNotFound('No key found with the provided id'),
        res,
      });
    }
    return key.update(body).then(() => endRequest({
      response: { ...key, ...body },
      code: 200,
      res,
    }));
  } catch (err) {
    return catchRequest({
      err: { code: 400, message: err.message },
      res,
    });
  }
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
