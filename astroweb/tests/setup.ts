import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

// Verificar que matchers no sea undefined o null
if (matchers) {
  // Extender los matchers de Vitest
  expect.extend(matchers);
} else {
  console.error('Error: matchers está undefined o null');
}

// Limpiar después de cada test
// ...existing code...
