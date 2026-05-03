import express from 'express';
import { router as helloWorldRouter, prefix as helloWorldPrefix } from './features/hello-world/routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Register feature routes
app.use(helloWorldPrefix, helloWorldRouter);

app.listen(PORT);

export default app;
