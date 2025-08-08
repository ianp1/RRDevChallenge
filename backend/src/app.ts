import express from 'express';
import platformRoutes from './routes/platform.routes';

const app = express();

app.use(express.json());

// Routes
app.use('/platforms', platformRoutes.router);

// Global error handler (should be after routes)
//app.use(errorHandler);

export default app;
