import express from 'express';

const app = express();

app.use(express.json());

// Routes

// Global error handler (should be after routes)
//app.use(errorHandler);

export default app;
