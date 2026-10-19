import app from './app.js';
import { config } from './config/env.js';

const server = app.listen(config.port, () => {
  console.log(`[backend-node] Server running on http://localhost:${config.port}`);
  console.log(`[backend-node] Environment: ${config.nodeEnv}`);
  console.log(`[backend-node] Python Service Target: ${config.pythonServiceUrl}`);
});

process.on('SIGTERM', () => {
  console.log('[backend-node] SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('[backend-node] Server closed.');
    process.exit(0);
  });
});
