import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('API-01: Health Endpoint', () => {
  it('GET /api/health returns 200 and expected status object', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      service: 'TokTickIT API',
    });
  });
});
