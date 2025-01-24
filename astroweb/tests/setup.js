import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Limpiar después de cada test
afterEach(() => {
  // Aquí puedes agregar la lógica de limpieza necesaria
});