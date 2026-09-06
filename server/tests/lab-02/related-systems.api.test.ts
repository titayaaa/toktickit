import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('API-03: Related Systems Endpoint', () => {
  it('GET /api/related-systems returns HTTP 200 and the active related systems', async () => {
    const response = await request(app).get('/api/related-systems');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    // Should return 7 active systems, ignoring the 1 inactive "Old Intranet"
    expect(response.body.length).toBe(7);
    
    // Explicitly verify "Old Intranet" is not returned
    const systemNames = response.body.map((s: any) => s.name);
    expect(systemNames).not.toContain('Old Intranet');
    expect(systemNames).toContain('Email');
    expect(systemNames).toContain('Campus Wi-Fi');
  });
});
