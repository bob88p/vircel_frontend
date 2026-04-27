import axios from 'axios';
import config from '../config';

const BASE_URL = `${config.apiUrl}${config.apiEndpoints.transactions}/analytics`;

// Helper to handle API errors
const handleError = (error, defaultErrorMsg) => {
  let errorMessage = defaultErrorMsg;
  if (error.response && error.response.data && error.response.data.detail) {
    errorMessage = error.response.data.detail;
  }
  throw new Error(errorMessage);
};

/**
 * Fetch top 10 most borrowed books.
 * Returns: [{ title, count, rank }, ...]
 */
export const getTopBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-books`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch top books');
  }
};

/**
 * Fetch current overdue rate statistics.
 * Returns: { total_loans, overdue_count, overdue_rate_pct }
 */
export const getOverdueRate = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/overdue-rate`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch overdue rate');
  }
};

/**
 * Fetch top 10 students with most borrows.
 * Returns: [{ name, borrows }, ...]
 */
export const getTopCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-customers`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch top customers');
  }
};

/**
 * Fetch weekly borrowing trend.
 * Returns: [{ year, week, label, total_borrows }, ...]
 */
export const getWeeklyTrend = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/weekly-trend`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch weekly trend');
  }
};


/**
 * Fetch monthly borrow trend.
 * Returns: [{ month, year, total_borrows }, ...]
 */
export const getMonthlyTrend = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trend`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch monthly trend');
  }
};

/**
 * Fetch borrow vs. return status summary.
 * Returns: { returned, borrowed, total }
 */
export const getBorrowReturnStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/status`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch borrow/return status');
  }
};
