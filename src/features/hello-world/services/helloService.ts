import type { HelloResponse } from '../types/hello.types';

export const helloService = {
  async fetchHelloMessage(signal?: AbortSignal): Promise<HelloResponse> {
    const response = await fetch('/api/hello', { signal });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hello message: ${response.statusText}`);
    }
    
    const data: HelloResponse = await response.json();
    return data;
  },
};
