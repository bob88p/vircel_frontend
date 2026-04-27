import axios from 'axios';
import config from '../config';

const BASE_URL = `${config.apiUrl}${config.apiEndpoints.transactions}`;

// Helper to handle API errors
const handleError = (error, defaultErrorMsg) => {
  let errorMessage = defaultErrorMsg;
  if (error.response && error.response.data && error.response.data.detail) {
    errorMessage = error.response.data.detail;
  }
  throw new Error(errorMessage);
};

// ── READ ───────────────────────────────────────────────────────────────────────

/**
 * Fetch all transactions (ordered by borrow_date DESC).
 * Returns: [{ id, book_title, student_name, student_email, borrow_date,
 *             due_date, return_date, fine, status }, ...]
 */
export const getAllTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch transactions');
  }
};

/**
 * Search students by name or email (for the borrow/return autocomplete).
 * @param {string} query
 * Returns: [{ id, name, email }, ...]
 */
export const searchStudents = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search-students/${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to search students for "${query}"`);
  }
};

/**
 * Search books by title or author (for the borrow autocomplete).
 * @param {string} query
 * Returns: [{ id, title, author, quantity }, ...]
 */
export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search-books/${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to search books for "${query}"`);
  }
};

/**
 * Search active/unpaid student loans by student name or email.
 * @param {string} query
 * Returns: [{ loan_id, book_title, book_id, student_id, student_name,
 *             student_email, year, faculty, borrow_date, due_date, fine, status }, ...]
 */
export const searchStudentLoans = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to search loans for "${query}"`);
  }
};

// ── WRITE ──────────────────────────────────────────────────────────────────────

/**
 * Borrow a book.
 * @param {{ student_id: number, book_id: number, staff_id: number }} borrowData
 * Returns: { success: true, message: string }
 * Throws on validation failures (400) with the backend error detail.
 */
export const borrowBook = async (borrowData) => {
  try {
    const response = await axios.post(`${BASE_URL}/borrow`, borrowData);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to process borrow request');
  }
};

/**
 * Return a book by loan ID.
 * @param {number} loanId
 * Returns: { success: true, message: string, transaction?: { ... } }
 */
export const returnBook = async (loanId) => {
  try {
    const response = await axios.post(`${BASE_URL}/return/${loanId}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to return loan #${loanId}`);
  }
};

/**
 * Pay the fine for a loan by loan ID.
 * @param {number} loanId
 * Returns: { success: true, message: string }
 */
export const payFine = async (loanId) => {
  try {
    const response = await axios.post(`${BASE_URL}/pay-fine/${loanId}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to pay fine for loan #${loanId}`);
  }
};

/**
 * Pay all fines for a student by student ID.
 * @param {number} studentId
 * Returns: { success: true, message: string }
 */
export const payAllFinesForStudent = async (studentId) => {
  try {
    const response = await axios.post(`${BASE_URL}/pay-all-fines/${studentId}`);
    return response.data;
  } catch (error) {
    return handleError(error, `Failed to pay fines for student #${studentId}`);
  }
};

