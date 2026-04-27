import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Mail, Loader2, AlertCircle, Banknote } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { useCustomers, useAddStudent } from '../hooks/useCustomers';
import { usePayAllFines } from '../hooks/useTransactions';
import Swal from 'sweetalert2';

// Map backend StudentStatus → Badge variant
const statusVariant = (status) => {
  if (!status) return 'neutral';
  const s = status.toLowerCase();
  if (s.includes('overdue')) return 'error';
  if (s.includes('unpaid')) return 'warning';
  if (s.includes('good')) return 'success';
  return 'neutral';
};

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  const { data: customers = [], isLoading, isError, error } = useCustomers(statusFilter);
  const payFinesMutation = usePayAllFines();

  const handlePayFines = (studentId, studentName, amount) => {
    Swal.fire({
      title: 'Confirm Payment',
      text: `Are you sure you want to mark ${amount} EGP as paid for ${studentName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Pay Now'
    }).then((result) => {
      if (result.isConfirmed) {
        payFinesMutation.mutate(studentId);
      }
    });
  };


  const filtered = customers.filter((c) =>
    `${c.name} ${c.email} ${c.id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-bauhaus-blue p-8 border-4 border-bauhaus-black shadow-bauhaus-lg text-white">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">Students Directory</h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-black inline-block px-2">SHOW STUDENTS</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: null, label: 'ALL STUDENTS' },
            { id: 'good', label: 'GOOD STANDING' },
            { id: 'unpaid', label: 'UNPAID FINES' },
            { id: 'overdue', label: 'OVERDUE BOOKS' },
            { id: 'paid_fines', label: 'PAID FINES' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-4 py-2 font-black uppercase tracking-widest text-xs border-4 border-bauhaus-black transition-all ${statusFilter === f.id
                ? 'bg-bauhaus-yellow text-bauhaus-black translate-x-1 translate-y-1 shadow-none'
                : 'bg-white text-bauhaus-black hover:bg-bauhaus-yellow shadow-bauhaus-sm'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>



      <Card decoration="square" decorationColor="bg-bauhaus-red">
        <div className="flex justify-between mb-8 pb-4 border-b-4 border-bauhaus-black items-end">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Students List</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">
              {isLoading ? 'Loading...' : `Total ${customers.length} Students`}
            </div>
          </div>
          <div className="w-[400px]">
            <Input
              icon={Search}
              placeholder="SEARCH STUDENTS..."
              className="uppercase bg-canvas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={48} className="animate-spin text-bauhaus-blue" strokeWidth={2.5} />
            <p className="font-black uppercase tracking-widest text-bauhaus-black/50">Loading students...</p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 border-4 border-bauhaus-red bg-bauhaus-red/10">
            <AlertCircle size={48} className="text-bauhaus-red" strokeWidth={2.5} />
            <p className="font-black uppercase tracking-widest text-bauhaus-red">
              {error?.message || 'Failed to load customers'}
            </p>
          </div>
        )}

        {/* Data table */}
        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-bauhaus-black bg-canvas">
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">student ID</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Name & Contact</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Faculty / Dept</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Last Activity</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm text-right">
                    {statusFilter === 'paid_fines' ? 'Paid Fines' : 'Unpaid Fines'}
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center font-black uppercase tracking-widest opacity-30 italic">
                      No Students found
                    </td>
                  </tr>
                ) : (
                  filtered.map((customer, i) => (
                    <tr
                      key={customer.id}
                      className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="p-4 font-black">{customer.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-lg uppercase leading-tight">{customer.name}</div>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <span className="font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                            <Mail size={14} strokeWidth={2.5} /> {customer.email}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-sm uppercase">
                        <div>{customer.faculty}</div>
                        <div className="text-bauhaus-black/50 text-xs">{customer.department}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-xs font-bold uppercase truncate max-w-[200px]">{customer.book_title || '—'}</div>
                        <div className="text-[10px] opacity-50 font-black">{customer.last_borrow_date || 'NO HISTORY'}</div>
                      </td>
                      <td className="p-4 text-right font-black">
                        <span className={statusFilter === 'paid_fines' ? 'text-green-600' : (customer.total_unpaid_fines > 0 ? 'text-bauhaus-red' : 'text-green-600')}>
                          {Number((statusFilter === 'paid_fines' ? customer.total_paid_fines : customer.total_unpaid_fines) || 0).toLocaleString()} EGP
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge variant={statusVariant(customer.student_status)}>
                          {customer.student_status || '—'}
                        </Badge>
                      </td>
                      <td className="p-4 flex gap-2 justify-end">
                        {statusFilter === 'unpaid' && customer.total_unpaid_fines > 0 && (
                          <Button
                            variant="yellow"
                            className="text-xs py-2 px-4 shadow-[2px_2px_0px_0px_#121212] flex items-center gap-2"
                            onClick={() => handlePayFines(customer.id, customer.name, customer.total_unpaid_fines)}
                            disabled={payFinesMutation.isPending}
                          >
                            <Banknote size={14} /> Pay
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="text-xs py-2 px-4 shadow-[2px_2px_0px_0px_#121212]"
                          onClick={() => navigate(`/customer/${customer.id}`)}
                        >
                          View Profile
                        </Button>
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
