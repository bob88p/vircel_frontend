import { useQuery } from '@tanstack/react-query';
import {
  getTopBooks,
  getOverdueRate,
  getTopCustomers,
  getWeeklyTrend,
  getMonthlyTrend,
  getBorrowReturnStatus,
} from '../api/analyticsApi';

// Query Keys
export const analyticsKeys = {
  all: ['analytics'],
  topBooks: () => [...analyticsKeys.all, 'topBooks'],
  overdueRate: () => [...analyticsKeys.all, 'overdueRate'],
  topCustomers: () => [...analyticsKeys.all, 'topCustomers'],
  weeklyTrend: () => [...analyticsKeys.all, 'weeklyTrend'],
  monthlyTrend: () => [...analyticsKeys.all, 'monthlyTrend'],
  borrowReturnStatus: () => [...analyticsKeys.all, 'borrowReturnStatus'],
  trend: () => [...analyticsKeys.all, 'trend'],
  status: () => [...analyticsKeys.all, 'status'],
};

/**
 * Hook to fetch top 10 most borrowed books.
 * Returns: [{ title, count, rank }, ...]
 */
export const useTopBooks = () => {
  return useQuery({
    queryKey: analyticsKeys.topBooks(),
    queryFn: getTopBooks,
  });
};

/**
 * Hook to fetch current overdue rate statistics.
 * Returns: { total_loans, overdue_count, overdue_rate_pct }
 */
export const useOverdueRate = () => {
  return useQuery({
    queryKey: analyticsKeys.overdueRate(),
    queryFn: getOverdueRate,
  });
};

/**
 * Hook to fetch top 10 students with most borrows.
 * Returns: [{ name, borrows }, ...]
 */
export const useTopCustomers = () => {
  return useQuery({
    queryKey: analyticsKeys.topCustomers(),
    queryFn: getTopCustomers,
  });
};

/**
 * Hook to fetch weekly borrowing trend.
 * Returns: [{ year, week, label, total_borrows }, ...]
 */
export const useWeeklyTrend = () => {
  return useQuery({
    queryKey: analyticsKeys.weeklyTrend(),
    queryFn: getWeeklyTrend,
  });
};

/**
 * Hook to fetch monthly borrow trend.
 * Returns: [{ month, year, total_borrows }, ...]
*/
export const useMonthlyTrend = () => {
  return useQuery({
    queryKey: analyticsKeys.trend(),
    queryFn: getMonthlyTrend,
  });
};

/**
 * Hook to fetch borrow vs. return status summary.
 * Returns: { returned, borrowed, total }
 */
export const useBorrowReturnStatus = () => {
  return useQuery({
    queryKey: analyticsKeys.status(),
    queryFn: getBorrowReturnStatus,
  });
};
