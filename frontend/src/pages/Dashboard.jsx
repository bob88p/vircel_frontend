import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Clock,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import {
  useDashboardStats,
  useLoansByDueDate,
} from '../hooks/useDashboard';
import DatePicker from '../components/DatePicker';

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  icon: Icon,
  colorClass,
  isLoading,
}) {
  return (
    <Card
      decoration="square"
      decorationColor={colorClass}
      className="h-full"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-sm font-bold tracking-widest uppercase">
              {title}
            </h2>

            <div className="text-5xl font-black tracking-tighter">
              {isLoading ? (
                <Loader2
                  size={36}
                  strokeWidth={2.5}
                  className="animate-spin opacity-40"
                />
              ) : (
                value ?? '—'
              )}
            </div>
          </div>

          <div
            className={`p-3 border-4 border-bauhaus-black ${colorClass}`}
          >
            <Icon
              size={32}
              strokeWidth={2.5}
              className="text-bauhaus-black"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0] // Default to today
  );

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: dueLoans = [], isLoading: dueLoansLoading } = useLoansByDueDate(selectedDate);

  return (
    <div className="flex flex-col gap-12">
      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-end bg-bauhaus-blue p-8 border-4 border-bauhaus-black shadow-bauhaus-lg relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-red rounded-full translate-x-1/3 -translate-y-1/3 border-8 border-bauhaus-black" />
        <div className="absolute bottom-0 right-32 w-32 h-32 bg-bauhaus-yellow rotate-45 translate-y-1/2 border-4 border-bauhaus-black" />

        <div className="relative z-10">
          <h1 className="text-6xl font-black tracking-tighter mb-2 leading-none">
            KAFR Elsheikh <br />Library
          </h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-black text-white inline-block px-2">
            TODAY'S GOOD DAY
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <Button variant="yellow" className="text-lg py-4 px-8 shadow-bauhaus-md" onClick={() => navigate('/borrow')}>
            Borrow Book
          </Button>
          <Button
            variant="outline"
            className="text-lg py-4 px-8 shadow-bauhaus-md text-bauhaus-black"
            onClick={() => navigate('/return')}
          >
            Return Book
          </Button>
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Books"
          value={stats?.total_books?.toLocaleString()}
          icon={BookOpen}
          colorClass="bg-bauhaus-yellow"
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Students"
          value={stats?.total_students?.toLocaleString()}
          icon={Users}
          colorClass="bg-white"
          isLoading={statsLoading}
        />
        <StatCard
          title="Overdue Books"
          value={stats?.overdue_items?.toLocaleString()}
          icon={Clock}
          colorClass="bg-bauhaus-red"
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Loans"
          value={stats?.total_loans?.toLocaleString()}
          icon={AlertTriangle}
          colorClass="bg-bauhaus-blue"
          isLoading={statsLoading}
        />
      </div>

      {/* ── Calendar & Due Loans ──────────────────────────────────────────────── */}
      <Card decoration="triangle" decorationColor="bg-bauhaus-red">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b-4 border-bauhaus-black pb-4 gap-4">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Due Loans</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">Select a date to view loans due</div>
          </div>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>

        {dueLoansLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={40} className="animate-spin text-bauhaus-red" strokeWidth={2.5} />
          </div>
        ) : !dueLoans || dueLoans.length === 0 ? (
          <div className="text-center py-16 font-black uppercase tracking-widest opacity-30 italic bg-canvas border-4 border-dashed border-bauhaus-black">
            No loans due on this date
          </div>
        ) : (
          <div className="overflow-x-auto border-4 border-bauhaus-black bg-white shadow-bauhaus-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-bauhaus-black bg-canvas">
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Student</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Book</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Borrow Date</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm text-right">Fine</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {dueLoans.map((loan, i) => (
                  <tr key={loan.loan_id || i} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4 font-bold uppercase">{loan.student_name}</td>
                    <td className="p-4 font-bold">{loan.book_title}</td>
                    <td className="p-4 font-bold">{loan.borrow_date ? new Date(loan.borrow_date).toLocaleDateString() : '—'}</td>
                    <td className="p-4 font-black text-right text-bauhaus-red">
                      ${loan.fine > 0 ? loan.fine.toFixed(2) : '0.00'}
                    </td>
                    <td className="p-4">
                      {loan.status === 'Returned' ? (
                        <Badge variant="primary">Returned</Badge>
                      ) : loan.status === 'Overdue' ? (
                        <Badge variant="danger">Overdue</Badge>
                      ) : (
                        <Badge variant="warning">Borrowed</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}