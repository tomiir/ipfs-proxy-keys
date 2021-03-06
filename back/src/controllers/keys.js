/* eslint-disable no-underscore-dangle */
import Key from '../models/keys.js';
import { endRequest, catchRequest } from '../helpers/request.js';

export const getKeys = async (req, res) => {
  const { id } = req.user;
  const keys = await Key.find({ userId: id });
  return endRequest({ response: keys, code: 200, res });
};

export const updateKey = async (req, res) => {
  const { params, body } = req;
  try {
    const updated = await Key.findByIdAndUpdate(
      params.id,
      body,
    );
    if (!updated) {
      return catchRequest({
        err: { code: 400 }, res, message: 'Error updating Key',
      });
    }
    return endRequest({
      response: body,
      code: 201,
      res,
    });
  } catch (err) {
    return catchRequest({
      err: { code: 400, message: err.message },
      res,
    });
  }
};

export const createKey = async (req, res) => {
  const { user, body } = req;
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
      err, res, message: 'Error saving Key',
    }));
};
