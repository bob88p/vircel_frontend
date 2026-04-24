import axios from 'axios';
import config from '../config';

const BASE_URL = `${config.apiUrl}${config.apiEndpoints.books}`;

// Helper to handle API errors
const handleError = (error, defaultErrorMsg) => {
  let errorMessage = defaultErrorMsg;
  if (error.response && error.response.data && error.response.data.detail) {
    errorMessage = error.response.data.detail;
  }
  throw new Error(errorMessage);
};

/**
 * Fetch all books
 */
export const getBooks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch books');
  }
};

/**
 * Fetch a single book by ID
 */
export const getBook = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to fetch book with id ${id}`);
  }
};

/**
 * Create a new book
 */
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(BASE_URL, bookData);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to create book');
  }
};

/**
 * Update an existing book
 */
export const updateBook = async ({ id, bookData }) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to update book with id ${id}`);
  }
};

/**
 * Delete a book
 */
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to delete book with id ${id}`);
  }
};
