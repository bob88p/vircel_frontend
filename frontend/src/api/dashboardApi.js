import axios from 'axios';
import config from '../config';

const BASE_URL = `${config.apiUrl}${config.apiEndpoints.dashboard}`;

// Helper to handle API errors
const handleError = (error, defaultErrorMsg) => {
  let errorMessage = defaultErrorMsg;
  if (error.response && error.response.data && error.response.data.detail) {
    errorMessage = error.response.data.detail;
  }
  throw new Error(errorMessage);
};

/**
 * Fetch overall dashboard stats.
 * Returns: { total_books, total_students, total_loans, overdue_items }
 */
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch dashboard stats');
  }
};

/**
 * Fetch all loans due on a specific date (calendar view).
 * @param {string} dueDate - Date string in YYYY-MM-DD format
 * Returns: array of loan records due on that date
 */
export const getLoansByDueDate = async (dueDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/due/${dueDate}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to fetch loans due on ${dueDate}`);
  }
};
