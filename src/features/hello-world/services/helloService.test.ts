import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { helloService } from './helloService';

describe('helloService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('fetchHelloMessage', () => {
    it('should return hello message on successful fetch', async () => {
      const mockResponse = { message: 'Hello, World' };
      
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await helloService.fetchHelloMessage();

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith('/api/hello', { signal: undefined });
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(helloService.fetchHelloMessage()).rejects.toThrow(
        'Failed to fetch hello message: Not Found'
      );
    });
  });
});
