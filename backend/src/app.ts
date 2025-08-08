import express from 'express';
import platformRoutes from './routes/platform.routes';
import errorHandler from './services/handlers/error.handler';

const app = express();

app.use(express.json());

// Routes
app.use('/platforms', platformRoutes.router);

// Global error handler (should be after routes)
//app.use(errorHandler);
app.use(errorHandler.handleError);

export default app;
