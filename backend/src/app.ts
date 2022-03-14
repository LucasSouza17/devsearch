import express from 'express';
import cors from 'cors';
import { router } from './routes';

import "dotenv/config";

const app = express();

app.use(cors());
app.options("*");

app.use(express.json());
app.use(router);

export { app };