import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  getAllTransactions,
  searchStudents,
  searchBooks,
  searchStudentLoans,
  borrowBook,
  returnBook,
  payFine,
  payAllFinesForStudent,
} from '../api/transactionsApi';

// Query Keys
export const transactionKeys = {
  all: ['transactions'],
  lists: () => [...transactionKeys.all, 'list'],
  searchStudents: (q) => [...transactionKeys.all, 'search-students', q],
  searchBooks: (q) => [...transactionKeys.all, 'search-books', q],
  searchLoans: (q) => [...transactionKeys.all, 'search-loans', q],
};

// ── Queries ────────────────────────────────────────────────────────────────────

/**
 * Hook to fetch all transactions.
 */
export const useTransactions = () => {
  return useQuery({
    queryKey: transactionKeys.lists(),
    queryFn: getAllTransactions,
  });
};

/**
 * Hook to search students by name or email.
 * Only fires when query is at least 2 characters.
 * @param {string} query
 */
export const useSearchStudents = (query) => {
  return useQuery({
    queryKey: transactionKeys.searchStudents(query),
    queryFn: () => searchStudents(query),
    enabled: query?.trim().length >= 2,
  });
};

/**
 * Hook to search books by title or author.
 * Only fires when query is at least 2 characters.
 * @param {string} query
 */
export const useSearchBooks = (query) => {
  return useQuery({
    queryKey: transactionKeys.searchBooks(query),
    queryFn: () => searchBooks(query),
    enabled: query?.trim().length >= 2,
  });
};

/**
 * Hook to search active/unpaid loans by student name or email.
 * Only fires when query is at least 2 characters.
 * @param {string} query
 */
export const useSearchStudentLoans = (query) => {
  return useQuery({
    queryKey: transactionKeys.searchLoans(query),
    queryFn: () => searchStudentLoans(query),
    enabled: query?.trim().length >= 2,
  });
};

// ── Mutations ──────────────────────────────────────────────────────────────────

/**
 * Hook to borrow a book.
 * mutate({ student_id, book_id, staff_id })
 */
export const useBorrowBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: borrowBook,
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Book borrowed successfully.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      // Refresh transaction list and dashboard stats
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Borrow Failed',
        text: error.message || 'Failed to process borrow request',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    },
  });
};

/**
 * Hook to return a book.
 * mutate(loanId)
 */
export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnBook,
    onSuccess: (data) => {
      const fine = data?.transaction?.fine;
      Swal.fire({
        title: 'Book Returned!',
        text: fine > 0
          ? `Book returned. A fine of ¥${fine} has been applied.`
          : 'Book returned successfully. No fines.',
        icon: fine > 0 ? 'warning' : 'success',
        confirmButtonColor: '#3085d6',
      });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Return Failed',
        text: error.message || 'Failed to process return',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    },
  });
};

/**
 * Hook to pay a fine.
 * mutate(loanId)
 */
export const usePayFine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payFine,
    onSuccess: () => {
      Swal.fire({
        title: 'Fine Paid!',
        text: 'The fine has been marked as paid.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Payment Failed',
        text: error.message || 'Failed to process fine payment',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    },
  });
};

/**
 * Hook to pay all fines for a student.
 * mutate(studentId)
 */
export const usePayAllFines = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payAllFinesForStudent,
    onSuccess: () => {
      Swal.fire({
        title: 'Fines Paid!',
        text: 'All outstanding fines for this student have been paid.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Payment Failed',
        text: error.message || 'Failed to process fine payment',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    },
  });
};
