import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCustomers,
  getUnpaidCustomers,
  getPaidFinesCustomers,
  getGoodStandingCustomers,
  getOverdueCustomers,
  addStudent,
} from '../api/customersApi';

// Query Keys
export const customerKeys = {
  all: ['customers'],
  lists: () => [...customerKeys.all, 'list'],
  list: (status) => [...customerKeys.lists(), { status }],
  unpaid: () => [...customerKeys.all, 'unpaid'],
  paidFines: () => [...customerKeys.all, 'paid-fines'],
  goodStanding: () => [...customerKeys.all, 'good-standing'],
  overdue: () => [...customerKeys.all, 'overdue'],
};

/**
 * Hook to fetch all customers with an optional status filter.
 * @param {string|null} status - 'unpaid' | 'paid_fines' | 'good' | 'overdue' | null
 */
export const useCustomers = (status = null) => {
  return useQuery({
    queryKey: customerKeys.list(status),
    queryFn: () => getCustomers(status),
  });
};

export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
};

/**
 * Hook to fetch customers with unpaid loans.
 */
export const useUnpaidCustomers = () => {
  return useQuery({
    queryKey: customerKeys.unpaid(),
    queryFn: getUnpaidCustomers,
  });
};

/**
 * Hook to fetch customers who have paid their fines.
 */
export const usePaidFinesCustomers = () => {
  return useQuery({
    queryKey: customerKeys.paidFines(),
    queryFn: getPaidFinesCustomers,
  });
};

/**
 * Hook to fetch customers in good standing.
 */
export const useGoodStandingCustomers = () => {
  return useQuery({
    queryKey: customerKeys.goodStanding(),
    queryFn: getGoodStandingCustomers,
  });
};

/**
 * Hook to fetch customers with overdue loans.
 */
export const useOverdueCustomers = () => {
  return useQuery({
    queryKey: customerKeys.overdue(),
    queryFn: getOverdueCustomers,
  });
};
