import axios from 'axios';
import config from '../config';

const BASE_URL = `${config.apiUrl}${config.apiEndpoints.customers}`;

// Helper to handle API errors
const handleError = (error, defaultErrorMsg) => {
  let errorMessage = defaultErrorMsg;
  if (error.response && error.response.data && error.response.data.detail) {
    errorMessage = error.response.data.detail;
  }
  throw new Error(errorMessage);
};

/**
 * Fetch all customers, with an optional status filter.
 * @param {string|null} status - 'unpaid' | 'paid_fines' | 'good' | 'overdue' | null
 */
export const getCustomers = async (status = null) => {
  try {
    const params = status ? { status } : {};
    const response = await axios.get(`${BASE_URL}/`, { params });
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch customers');
  }
};

/**
 * Fetch customers with unpaid loans.
 */
export const getUnpaidCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/unpaid`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch unpaid customers');
  }
};

/**
 * Fetch customers who have paid their fines.
 */
export const getPaidFinesCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/paid-fines`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch paid-fines customers');
  }
};

/**
 * Fetch customers in good standing.
 */
export const getGoodStandingCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/good-standing`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch good-standing customers');
  }
};

/**
 * Fetch customers with overdue loans.
 */
export const getOverdueCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/overdue`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch overdue customers');
  }
};

/**
 * Add a new student/customer.
 * @param {Object} studentData - { name, email, year, faculty, department }
 */
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-student`, studentData);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to add student');
  }
};
