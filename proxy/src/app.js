import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import requestLogger from "./middlewares/request.js";

import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from "./db.js";

const app = express();
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

app.use(express.json());
app.use(cors());
app.use(requestLogger);

const IFPSProxy = createProxyMiddleware({
  target: process.env.IPFS_URL,
  changeOrigin: true,
  logLevel: "debug",
});

app.use(IFPSProxy);


app.get("/health", (_req, res) => res.status(200).send());

initDatabase();

export default app;
