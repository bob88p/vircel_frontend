import { useQuery } from '@tanstack/react-query';
import {
  getDashboardStats,

  getLoansByDueDate,
} from '../api/dashboardApi';

// Query Keys
export const dashboardKeys = {
  all: ['dashboard'],
  stats: () => [...dashboardKeys.all, 'stats'],

  due: (date) => [...dashboardKeys.all, 'due', date],
};

/**
 * Hook to fetch overall dashboard stats.
 * Returns: { total_books, total_students, total_loans, overdue_items }
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
  });
};


/**
 * Hook to fetch loans due on a specific date (calendar view).
 * @param {string|null} dueDate - Date string in YYYY-MM-DD format, or null to skip
 */
export const useLoansByDueDate = (dueDate) => {
  return useQuery({
    queryKey: dashboardKeys.due(dueDate),
    queryFn: () => getLoansByDueDate(dueDate),
    enabled: !!dueDate, // only fetch when a date is selected
  });
};
