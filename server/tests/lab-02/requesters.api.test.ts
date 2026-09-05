import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('GET /api/requesters', () => {
  it('should return 200 and a list of active requesters', async () => {
    const response = await request(app).get('/api/requesters');
    
    // Test should fail initially because the endpoint doesn't exist
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    // Based on our seed data, we should have active requesters
    expect(response.body.length).toBeGreaterThan(0);
    
    // It should not return inactive requesters
    const hasInactive = response.body.some((r: any) => r.isActive === false);
    expect(hasInactive).toBe(false);
  });
});
