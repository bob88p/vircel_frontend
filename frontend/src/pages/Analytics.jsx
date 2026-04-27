import React from 'react';
import { BarChart3, TrendingUp, Download, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { useDashboardStats } from '../hooks/useDashboard';
import { useTopBooks, useOverdueRate, useTopCustomers, useWeeklyTrend, useBorrowReturnStatus, useMonthlyTrend } from '../hooks/useAnalytics';

export default function Analytics() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: borrowStatus, isLoading: statusLoading } = useBorrowReturnStatus();

  const { data: overdueData, isLoading: overdueLoading } = useOverdueRate();
  const { data: topBooks = [], isLoading: topBooksLoading } = useTopBooks();
  const { data: topCustomers = [], isLoading: topCustomersLoading } = useTopCustomers();
  const { data: weeklyTrend = [], isLoading: weeklyTrendLoading } = useWeeklyTrend();
  const { data: monthlyTrend = [], isLoading: monthlyTrendLoading } = useMonthlyTrend();

  const turnoverRate = (stats?.total_loans && stats?.total_books)
    ? (stats.total_loans / stats.total_books).toFixed(1)
    : 0;

  const maxWeeklyBorrows = Math.max(...weeklyTrend.map(w => w.total_borrows), 1);
  const recentWeeks = weeklyTrend.slice(-6);

  // ── Borrow/Return bar categories from real data ──────────────────────────────
  const total = borrowStatus?.total || 1; // avoid division by zero
  const statusBars = [
    {
      label: 'Borrowed',
      value: borrowStatus?.borrowed ?? 0,
      pct: Math.round(((borrowStatus?.borrowed ?? 0) / total) * 100),
      color: 'bg-bauhaus-blue',
    },
    {
      label: 'Returned',
      value: borrowStatus?.returned ?? 0,
      pct: Math.round(((borrowStatus?.returned ?? 0) / total) * 100),
      color: 'bg-white',
    },
  ];

  // ── Last 6 months of trend for the mini-chart ────────────────────────────────
  const recentTrend = monthlyTrend.slice(-6);
  const maxBorrows = Math.max(...recentTrend.map((r) => r.total_borrows), 1);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-bauhaus-black p-8 border-4 border-bauhaus-black shadow-bauhaus-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 border-[16px] border-bauhaus-yellow rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="relative z-10">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">Advanced Analytics</h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-yellow text-bauhaus-black inline-block px-2 uppercase">In-depth insights into operations</p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card decoration="square" decorationColor="bg-bauhaus-blue">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 border-b-4 border-bauhaus-black pb-2">Overdue Rate</h3>
          <div className="text-5xl font-black tracking-tighter">
            {overdueLoading ? <Loader2 className="animate-spin" /> : `${overdueData?.overdue_rate_pct ?? 0}%`}
          </div>
          <div className="text-sm font-bold tracking-widest uppercase mt-4 text-[#4ADE80] bg-bauhaus-black inline-block px-2">
            {overdueData?.overdue_count ?? 0} ITEMS OVERDUE
          </div>
        </Card>

        <Card decoration="circle" decorationColor="bg-bauhaus-red">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 border-b-4 border-bauhaus-black pb-2">Collection Turnover</h3>
          <div className="text-5xl font-black tracking-tighter">
            {statsLoading ? <Loader2 className="animate-spin" /> : `${turnoverRate}x`}
          </div>
          <div className="text-sm font-bold tracking-widest uppercase mt-4 text-[#4ADE80] bg-bauhaus-black inline-block px-2">LOANS PER BOOK</div>
        </Card>

        <Card decoration="triangle" decorationColor="bg-bauhaus-yellow">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 border-b-4 border-bauhaus-black pb-2">Active Loans</h3>
          <div className="text-5xl font-black tracking-tighter">
            {statusLoading ? <Loader2 className="animate-spin" /> : borrowStatus?.borrowed ?? 0}
          </div>
          <div className="text-sm font-bold tracking-widest uppercase mt-4 text-white bg-bauhaus-blue inline-block px-2">BOOKS CURRENTLY OUT</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Monthly Trend mini bar chart */}
        <Card className="lg:col-span-2 flex flex-col" decoration="circle" decorationColor="bg-bauhaus-blue">
          <div className="mb-8 border-b-4 border-bauhaus-black pb-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Monthly Trend</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">Borrows per month — last 6 months</div>
          </div>

          {monthlyTrendLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={40} className="animate-spin text-bauhaus-blue" strokeWidth={2.5} />
            </div>
          ) : recentTrend.length === 0 ? (
            <div className="text-center py-16 font-black uppercase tracking-widest opacity-30 italic">
              No trend data available
            </div>
          ) : (
            <div className="flex items-end gap-3 h-48">
              {recentTrend.map((row) => {
                const heightPct = Math.round((row.total_borrows / maxBorrows) * 100);
                return (
                  <div key={`${row.year}-${row.month}`} className="flex flex-col items-center gap-2 flex-1">
                    <span className="font-black text-sm">{row.total_borrows}</span>
                    <div
                      className="w-full bg-bauhaus-blue border-2 border-bauhaus-black transition-all duration-500 shadow-bauhaus-sm"
                      style={{ height: `${Math.max(heightPct, 4)}%` }}
                    />
                    <span className="font-bold text-xs uppercase tracking-wider text-bauhaus-black/60 text-center leading-tight">
                      {row.month}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Borrow vs Return status */}
        <Card decoration="triangle" decorationColor="bg-bauhaus-yellow" className="bg-bauhaus-yellow">
          <div className="mb-8 border-b-4 border-bauhaus-black pb-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Books Status</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">
              Borrowed vs Returned · Total from loans {borrowStatus?.total ?? '—'}
            </div>
          </div>

          {statusLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={40} className="animate-spin" strokeWidth={2.5} />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {statusBars.map((cat) => (
                <div key={cat.label} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="font-bold uppercase tracking-wider text-sm">{cat.label}</span>
                    <span className="font-black text-xl leading-none">{cat.value}</span>
                  </div>
                  <div className="h-6 w-full bg-white border-2 border-bauhaus-black flex">
                    <div
                      className={`${cat.color} border-r-2 border-bauhaus-black transition-all duration-500`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                  <div className="text-xs font-bold text-right uppercase tracking-widest opacity-60">
                    {cat.pct}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col min-h-[400px]" decoration="circle" decorationColor="bg-white">
          <div className="flex justify-between items-center mb-8 pb-4 border-b-4 border-bauhaus-black">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Weekly Trends</h2>
              <div className="text-sm font-bold tracking-widest uppercase mt-2">Checkouts Over Last Weeks</div>
            </div>
          </div>

          <div className="flex-1 border-4 border-dashed border-bauhaus-black bg-canvas flex items-end gap-4 p-8 relative overflow-hidden">
            {weeklyTrendLoading ? (
              <div className="w-full flex justify-center"><Loader2 size={48} className="animate-spin text-bauhaus-blue" /></div>
            ) : recentWeeks.length === 0 ? (
              <div className="w-full text-center font-bold opacity-50">No weekly data available</div>
            ) : (
              recentWeeks.map((week, idx) => {
                const heightPct = Math.round((week.total_borrows / maxWeeklyBorrows) * 100);
                const colors = ['bg-bauhaus-blue', 'bg-bauhaus-red', 'bg-bauhaus-yellow', 'bg-bauhaus-black'];
                const color = colors[idx % colors.length];
                return (
                  <div key={`${week.year}-${week.week}`} className="flex flex-col items-center flex-1 h-full justify-end gap-2 relative z-10">
                    <div className="font-black text-xl bg-white px-1 border-2 border-bauhaus-black">{week.total_borrows}</div>
                    <div
                      className={`w-full ${color} border-4 border-bauhaus-black shadow-bauhaus-sm transition-all duration-500`}
                      style={{ height: `${Math.max(heightPct, 10)}%` }}
                    />
                    <div className="font-bold text-xs uppercase text-center bg-white border-2 border-bauhaus-black px-1 mt-1">WK {week.week}</div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card decoration="square" decorationColor="bg-bauhaus-blue">
          <div className="mb-8 pb-4 border-b-4 border-bauhaus-black flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Top Titles</h2>
              <div className="text-sm font-bold tracking-widest uppercase mt-2">Most circulated items</div>
            </div>
            <Badge variant="primary">Top 10</Badge>
          </div>
          {topBooksLoading ? (
            <div className="flex justify-center py-12"><Loader2 size={48} className="animate-spin" /></div>
          ) : topBooks.length === 0 ? (
            <div className="text-center py-8 font-bold opacity-50">No book data available</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[400px]">
                <thead>
                  <tr className="border-b-4 border-bauhaus-black bg-canvas">
                    <th className="p-4 font-bold uppercase tracking-wider text-sm">Rank</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-sm">Title</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-sm text-right">Checkouts</th>
                  </tr>
                </thead>
                <tbody>
                  {topBooks.slice(0, 5).map((item, i) => (
                    <tr key={item.title} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="p-4 font-black text-2xl">#{item.rank}</td>
                      <td className="p-4 font-bold uppercase">{item.title}</td>
                      <td className="p-4 font-black text-xl text-right">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card decoration="triangle" decorationColor="bg-bauhaus-red" className="lg:col-span-2">
          <div className="mb-8 pb-4 border-b-4 border-bauhaus-black flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Top Customers</h2>
              <div className="text-sm font-bold tracking-widest uppercase mt-2">Most active library users</div>
            </div>
            <Badge variant="warning">Top 10</Badge>
          </div>
          {topCustomersLoading ? (
            <div className="flex justify-center py-12"><Loader2 size={48} className="animate-spin" /></div>
          ) : topCustomers.length === 0 ? (
            <div className="text-center py-8 font-bold opacity-50">No customer data available</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCustomers.map((customer, idx) => (
                <div key={customer.name} className="flex items-center justify-between p-4 border-4 border-bauhaus-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-bauhaus-yellow border-2 border-bauhaus-black flex items-center justify-center font-black text-xl">
                      {idx + 1}
                    </div>
                    <div className="font-bold uppercase tracking-wide">{customer.name}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-black text-2xl">{customer.borrows}</div>
                    <div className="text-xs font-bold tracking-widest uppercase">Borrows</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
