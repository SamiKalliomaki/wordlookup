// Test setup file for Vitest unit tests
import { vi, beforeEach, afterEach } from 'vitest';

// Setup and cleanup for each test
beforeEach(() => {
  // Reset fetch mock before each test
  vi.clearAllMocks();

  // Reset timers
  vi.useFakeTimers();
});

afterEach(() => {
  // Restore timers after each test
  vi.useRealTimers();
});
