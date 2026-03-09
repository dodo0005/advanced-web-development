import config from './config.js'  // Keep config import

// Dummy db object to satisfy imports elsewhere
const db = {
  get: () => null,
  all: () => [],
  run: () => true,
  prepare: () => ({ run: () => true, get: () => null, all: () => [] }),
}

// Initialize database function (does nothing but keeps code compatible)
export const initializeDatabase = async () => {
  console.log('⚡ Database is disabled; skipping initialization.')
}

// Export dummy db
export default db