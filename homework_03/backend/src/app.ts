import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { authRouter, recipeRouter } from './routes';
import { RedisService } from './services';
import { errorHandler, logger } from './utils';

const app = express();

const PORT = process.env.PORT || 3000;

await RedisService.getInstance();

app.get('/', (req, res) => {
  res.status(200).send('healthy');
});

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
