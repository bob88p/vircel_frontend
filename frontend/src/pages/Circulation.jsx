import { useState } from 'react';
import { Search, RefreshCw, ArrowRightLeft, Loader2, AlertCircle, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { useTransactions, usePayFine } from '../hooks/useTransactions';

// Map backend status strings → Badge variant
const statusVariant = (status) => {
  if (!status) return 'neutral';
  const s = status.toUpperCase();
  if (s.includes('OVERDUE')) return 'error';
  if (s.includes('UNPAID')) return 'warning';
  if (s.includes('RETURNED PAID') || s === 'RETURNED') return 'success';
  if (s === 'UNDERDUE') return 'primary';
  return 'neutral';
};

export default function Circulation() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { data: transactions = [], isLoading, isError, error, refetch } = useTransactions();
  const payFineMutation = usePayFine();

  const filtered = transactions.filter((t) =>
    `${t.id} ${t.book_title} ${t.student_name} ${t.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-end bg-white p-8 border-4 border-bauhaus-black shadow-bauhaus-lg">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">Circulation Logs</h1>
          <p className="text-xl font-bold tracking-widest text-bauhaus-blue uppercase">Track checkouts, returns &amp; fines</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="py-3 px-6 shadow-bauhaus-md" onClick={() => navigate('/borrow')}>
            <ArrowRightLeft size={20} strokeWidth={2.5} />
            Borrow
          </Button>
          <Button variant="primary" className="py-3 px-6 shadow-bauhaus-md" onClick={() => navigate('/return')}>
            <ArrowRightLeft size={20} strokeWidth={2.5} />
            Return
          </Button>
        </div>
      </div>

      <Card decoration="circle" decorationColor="bg-bauhaus-yellow">
        <div className="flex justify-between mb-8 pb-4 border-b-4 border-bauhaus-black items-end">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">All Transactions</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">
              {isLoading ? 'Loading...' : `${filtered.length} record(s)`}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              variant="ghost"
              shape="square"
              className="p-3 border-2 border-transparent hover:border-bauhaus-black"
              onClick={() => refetch()}
            >
              <RefreshCw size={24} strokeWidth={2.5} className={isLoading ? 'animate-spin' : ''} />
            </Button>
            <div className="w-[300px]">
              <Input
                icon={Search}
                placeholder="SEARCH LOGS..."
                className="uppercase bg-canvas"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24 gap-4">
            <Loader2 size={48} className="animate-spin text-bauhaus-blue" strokeWidth={2.5} />
            <p className="font-black uppercase tracking-widest text-bauhaus-black/50">Loading transactions...</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex items-center justify-center py-24 gap-4 border-4 border-bauhaus-red bg-bauhaus-red/10">
            <AlertCircle size={48} className="text-bauhaus-red" strokeWidth={2.5} />
            <p className="font-black uppercase tracking-widest text-bauhaus-red">
              {error?.message || 'Failed to load transactions'}
            </p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-bauhaus-black bg-canvas">
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Loan ID</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Book</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Student</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Borrow Date</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Due Date</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Fine</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center font-black uppercase tracking-widest opacity-30 italic">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filtered.map((t, i) => (
                    <tr key={t.id} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="p-4 font-black">#{t.id}</td>
                      <td className="p-4 font-medium max-w-[200px] truncate">{t.book_title}</td>
                      <td className="p-4">
                        <div className="font-bold">{t.student_name}</div>
                        <div className="text-xs text-bauhaus-black/50">{t.student_email}</div>
                      </td>
                      <td className="p-4 font-medium text-sm">{t.borrow_date?.slice(0, 10)}</td>
                      <td className={`p-4 font-medium text-sm ${!t.return_date && new Date(t.due_date) < new Date() ? 'text-bauhaus-red font-black' : ''}`}>
                        {t.due_date?.slice(0, 10)}
                      </td>
                      <td className="p-4 font-black">
                        {t.fine > 0 ? (
                          <span className="text-bauhaus-red">¥{t.fine}</span>
                        ) : (
                          <span className="opacity-30">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
                      </td>
                      <td className="p-4">
                        {t.status === 'RETURNED UNPAID' && (
                          <Button
                            variant="yellow"
                            className="text-xs py-2 px-3 shadow-[2px_2px_0px_0px_#121212]"
                            onClick={() => payFineMutation.mutate(t.id)}
                            disabled={payFineMutation.isPending}
                          >
                            <DollarSign size={14} />
                            Pay Fine
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
