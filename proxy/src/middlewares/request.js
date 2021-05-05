import Key from "../models/keys.js";

const requestLogger = async (req, res, next) => {
  const apiKey = req.headers['ipfs-api-key'];
  if (!apiKey) return res.status(401).send({ message: 'Invalid Key'});
  const key = await Key.findOne({ value: apiKey });
  if (!key) return res.status(404).send({ message: 'Invalid Key'});
  
  const { active, requests = [] } = key;
  if (!key.active) return res.status(401).send({ message: 'Invalid Key'});
  
  const request = {
    keyId: key._id,
    url: req.url,
    method: req.method,
    timestamp: new Date(),
    size: req.socket.bytesRead
  };
  key.requests = [...requests, request];
  await key.save();
  next();
};

export default requestLogger;
