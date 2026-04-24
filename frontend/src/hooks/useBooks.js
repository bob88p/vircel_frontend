import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../api/booksApi';

// Query Keys
export const bookKeys = {
  all: ['books'],
  lists: () => [...bookKeys.all, 'list'],
  list: (filters) => [...bookKeys.lists(), { filters }],
  details: () => [...bookKeys.all, 'detail'],
  detail: (id) => [...bookKeys.details(), id],
};

/**
 * Hook to fetch all books
 */
export const useBooks = () => {
  return useQuery({
    queryKey: bookKeys.lists(),
    queryFn: getBooks,
    enabled: false
  });
};

/**
 * Hook to fetch a single book by ID
 */
export const useBook = (id) => {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => getBook(id),
    enabled: !!id, // Only fetch if an ID is provided
  });
};

/**
 * Hook to create a new book
 */
export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      Swal.fire({
        title: 'Created!',
        text: 'Book created successfully.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      // Invalidate and refetch the books list
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to create book',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  });
};

/**
 * Hook to update an existing book
 */
export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBook,
    onSuccess: (data, variables) => {
      Swal.fire({
        title: 'Updated!',
        text: 'Book updated successfully.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      // Invalidate the specific book detail query
      queryClient.invalidateQueries({ queryKey: bookKeys.detail(variables.id) });
      // Also invalidate the books list to reflect the update
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to update book',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  });
};

/**
 * Hook to delete a book
 */
export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: (data, id) => {
      Swal.fire({
        title: 'Deleted!',
        text: 'The book has been deleted.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      // Remove the specific book from cache
      queryClient.removeQueries({ queryKey: bookKeys.detail(id) });
      // Invalidate the books list to trigger a refetch
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
    onError: (error) => {
      // Display the error message that was parsed from the backend
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to delete book',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  });
};
