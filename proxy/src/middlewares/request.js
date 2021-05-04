import Key from "../models/keys.js";
import Request from "../models/requests.js";

const requestLogger = async (req, res, next) => {
  const apiKey = req.headers['ipfs-api-key'];
  if (!apiKey) return res.status(401).send({ message: 'Invalid Key'});
  const key = await Key.findOne({ value: apiKey });
  if (!key) return res.status(404).send({ message: 'Invalid Key'});
  if (!key.active) return res.status(401).send({ message: 'Invalid Key'});
  
  await new Request({
    keyId: key._id,
    url: req.url,
    method: req.method,
    timestamp: new Date(),
    size: req.socket.bytesRead
  }).save(); 
  next();
};

export default requestLogger;
