import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Mail, Calendar, Book, Clock, AlertTriangle,
  CheckCircle2, History, Loader2, AlertCircle, GraduationCap, Building2,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { useCustomers } from '../hooks/useCustomers';

// Map backend StudentStatus → Badge variant
const statusVariant = (status) => {
  if (!status) return 'neutral';
  const s = status.toLowerCase();
  if (s.includes('overdue')) return 'error';
  if (s.includes('unpaid')) return 'warning';
  if (s.includes('good')) return 'success';
  return 'neutral';
};

export default function CustomerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch all customers and find the one matching the URL id
  const { data: customers = [], isLoading, isError, error } = useCustomers();
  const customer = customers.find((c) => String(c.id) === String(id));

  // Derive loan state from student_status
  const hasActiveLoan = customer?.student_status?.toLowerCase().includes('overdue') ||
    (customer?.total_borrows > customer?.books_returned);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={56} className="animate-spin text-bauhaus-blue" strokeWidth={2.5} />
        <p className="font-black uppercase tracking-widest text-bauhaus-black/50">Loading member...</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 border-4 border-bauhaus-red bg-bauhaus-red/10 p-12">
        <AlertCircle size={56} className="text-bauhaus-red" strokeWidth={2.5} />
        <p className="font-black uppercase tracking-widest text-bauhaus-red">
          {error?.message || 'Failed to load member data'}
        </p>
        <Button variant="outline" onClick={() => navigate('/customers')}>Back to Directory</Button>
      </div>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle size={56} className="text-bauhaus-yellow" strokeWidth={2.5} />
        <p className="font-black uppercase tracking-widest">Member #{id} not found</p>
        <Button variant="primary" onClick={() => navigate('/customers')}>Back to Directory</Button>
      </div>
    );
  }

  const initials = customer.name?.split(' ').map((n) => n[0]).join('') || '?';

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            shape="square"
            onClick={() => navigate('/customers')}
            className="border-2 border-bauhaus-black hover:bg-bauhaus-blue transition-colors"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </Button>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Member Archive</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left Column ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col gap-8">

          {/* Identity card */}
          <Card decoration="circle" decorationColor="bg-bauhaus-blue" className="bg-white p-0 overflow-hidden">
            <div className="p-8 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-bauhaus-black text-white flex items-center justify-center text-3xl font-black border-4 border-bauhaus-black shadow-bauhaus-sm">
                  {initials}
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase leading-tight">{customer.name}</h2>
                  <div className="text-sm font-bold tracking-widest text-bauhaus-black/60 uppercase mt-1">
                    ID: {customer.id}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t-4 border-bauhaus-black pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bauhaus-yellow border-2 border-bauhaus-black flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{customer.email || '—'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bauhaus-blue border-2 border-bauhaus-black flex items-center justify-center text-white">
                    <GraduationCap size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-tight uppercase">Year {customer.year || '—'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bauhaus-red border-2 border-bauhaus-black flex items-center justify-center text-white">
                    <Building2 size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-tight uppercase">
                    {customer.faculty || '—'} · {customer.department || '—'}
                  </span>
                </div>
                {customer.last_borrow_date && (
                  <div className="flex flex-col gap-1 border-l-4 border-bauhaus-black pl-4 my-2">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-bauhaus-black/40" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-bauhaus-black/40">Latest Activity</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-xs uppercase tracking-tight">
                        Last Borrowed: <span className="font-black">{customer.last_borrow_date}</span>
                      </span>
                      {customer.last_return_date && (
                        <span className="font-bold text-xs uppercase tracking-tight">
                          Last Returned: <span className="font-black text-green-600">{customer.last_return_date}</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Loan eligibility */}
          <Card
            decoration="square"
            decorationColor={hasActiveLoan ? 'bg-bauhaus-red' : 'bg-green-500'}
            className={hasActiveLoan ? 'bg-bauhaus-red text-white' : 'bg-green-500 text-white'}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                {hasActiveLoan ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                Loan Eligibility
              </h3>
              <p className="text-sm font-bold leading-tight opacity-90 uppercase tracking-wide">
                {hasActiveLoan
                  ? 'SYSTEM LOCK: ONE LOAN PER CUSTOMER POLICY. THIS MEMBER MUST RETURN THE CURRENT BOOK BEFORE STARTING A NEW LOAN.'
                  : 'ELIGIBLE: NO ACTIVE LOANS DETECTED. MEMBER MAY BORROW A NEW TITLE.'}
              </p>
              {hasActiveLoan && (
                <Button
                  variant="yellow"
                  className="w-full mt-2 text-bauhaus-black py-3"
                  onClick={() => navigate('/return', { state: { customerId: customer.id, customerName: customer.name } })}
                >
                  Return Current Book
                </Button>
              )}
            </div>
          </Card>

          {/* Fine summary */}
          <Card decoration="triangle" decorationColor="bg-bauhaus-yellow">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-b-4 border-bauhaus-black pb-3">
              Fine Summary
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-sm tracking-wider">Unpaid Fines</span>
                <span className="font-black text-xl text-bauhaus-red">
                  {Number(customer.total_unpaid_fines ?? 0).toLocaleString()} EGP
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-sm tracking-wider">Paid Fines</span>
                <span className="font-black text-xl text-green-600">
                  {Number(customer.total_paid_fines ?? 0).toLocaleString()} EGP
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Right Column ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Current circulation status */}
          <Card decoration="triangle" decorationColor="bg-bauhaus-yellow">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-bauhaus-black pb-4 flex items-center gap-3">
              <Clock className="text-bauhaus-blue" />
              Current Circulation Status
            </h3>

            {hasActiveLoan ? (
              <div className="border-4 border-bauhaus-black p-6 bg-canvas flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-bauhaus-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-bauhaus-blue/5 -translate-y-1/2 translate-x-1/2 rotate-45" />
                <div className="flex gap-6 items-center z-10">
                  <div className="w-20 h-20 bg-white border-4 border-bauhaus-black flex items-center justify-center shadow-bauhaus-sm">
                    <Book size={40} className="text-bauhaus-blue" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-bauhaus-blue">Active Loan Profile</div>
                    <div className="text-2xl font-black uppercase tracking-tight leading-tight">
                      {customer.book_title || 'Unknown Title'}
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                        <Calendar size={14} className="text-bauhaus-black/40" />
                        <span>Borrowed: {customer.last_borrow_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-bauhaus-red">
                        <Clock size={14} />
                        <span>Due: {customer.due_date || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant={statusVariant(customer.student_status)} className="text-lg py-3 px-8 shadow-bauhaus-sm whitespace-nowrap">
                  {customer.student_status}
                </Badge>
              </div>
            ) : (
              <div className="border-4 border-dashed border-bauhaus-black/20 p-12 text-center bg-gray-50">
                <div className="text-2xl font-black uppercase tracking-widest opacity-20 italic">
                  No Books Currently Borrowed
                </div>
                <Button
                  variant="primary"
                  className="mt-6 px-10"
                  onClick={() => navigate('/borrow', { state: { customerId: customer.id, customerName: customer.name } })}
                >
                  Borrow A Book
                </Button>
              </div>
            )}
          </Card>

          {/* Borrow statistics */}
          <Card decoration="square" decorationColor="bg-bauhaus-black">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-bauhaus-black pb-4 flex items-center gap-3">
              <History className="text-bauhaus-red" />
              Borrow Statistics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border-4 border-bauhaus-black p-6 text-center bg-canvas shadow-bauhaus-sm">
                <div className="text-5xl font-black">{customer.total_borrows ?? 0}</div>
                <div className="text-xs font-bold uppercase tracking-widest mt-2 text-bauhaus-black/60">Total Borrows</div>
              </div>
              <div className="border-4 border-bauhaus-black p-6 text-center bg-canvas shadow-bauhaus-sm">
                <div className="text-5xl font-black">{customer.books_returned ?? 0}</div>
                <div className="text-xs font-bold uppercase tracking-widest mt-2 text-bauhaus-black/60">Returned</div>
              </div>
              <div className="border-4 border-bauhaus-black p-6 text-center bg-canvas shadow-bauhaus-sm">
                <div className="text-5xl font-black text-bauhaus-red">
                  {(customer.total_borrows ?? 0) - (customer.books_returned ?? 0)}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mt-2 text-bauhaus-black/60">Outstanding</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
