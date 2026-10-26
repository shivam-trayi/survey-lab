import { Router } from 'express';
import { config } from '../config/env.js';
import { pythonService } from '../services/pythonService.js';

const router = Router();

// Primary Node health check
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: config.appName,
    version: config.appVersion,
    environment: config.nodeEnv,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Composite health check querying Node.js and Python backend
router.get('/services', async (req, res) => {
  const pythonHealth = await pythonService.checkHealth();

  const isAllHealthy = pythonHealth.healthy;
  const statusCode = isAllHealthy ? 200 : 207; // 207 Multi-Status if one service is degraded

  res.status(statusCode).json({
    status: isAllHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    services: {
      node: {
        status: 'connected',
        healthy: true,
        service: config.appName,
        version: config.appVersion,
        uptimeSeconds: Math.floor(process.uptime()),
      },
      python: pythonHealth,
    },
  });
});

export default router;
