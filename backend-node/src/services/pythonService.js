import axios from 'axios';
import { config } from '../config/env.js';

const pythonClient = axios.create({
  baseURL: config.pythonServiceUrl,
  timeout: config.pythonTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const pythonService = {
  /**
   * Check connection & health of Python backend service
   */
  async checkHealth() {
    try {
      const response = await pythonClient.get('/health');
      return {
        status: 'connected',
        healthy: true,
        data: response.data,
      };
    } catch (error) {
      return {
        status: 'unreachable',
        healthy: false,
        error: error.code === 'ECONNABORTED'
          ? `Request timed out after ${config.pythonTimeoutMs}ms`
          : error.message || 'Unable to connect to Python backend',
      };
    }
  },
};
