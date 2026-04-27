/**
 * Application configuration
 * Pulls values from environment variables (Vite-prefixed)
 */
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  appName: import.meta.env.VITE_APP_NAME || 'Bauhaus Library',
  isDebug: import.meta.env.VITE_DEBUG === 'true',

  // You can add more settings here
  apiEndpoints: {
    books: '/api/books',
    customers: '/api/customers',
    transactions: '/api/transactions',
    dashboard: '/api/transactions/dashboard',
  }
};

export default config;
