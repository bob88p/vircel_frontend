import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { useSearchStudentLoans, useReturnBook } from '../hooks/useTransactions';

export default function Return() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle initial state from router (e.g. from CustomerProfile)
  useEffect(() => {
    if (location.state?.customerName) {
      setLoanQuery(location.state.customerName);
      setShowResults(true);
    }
  }, [location.state]);
  const [succeeded, setSucceeded] = useState(false);
  const [returnResult, setReturnResult] = useState(null);

  const [loanQuery, setLoanQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loanResults = [], isFetching } = useSearchStudentLoans(loanQuery);
  const returnMutation = useReturnBook();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedLoan) return;
    returnMutation.mutate(selectedLoan.loan_id, {
      onSuccess: (data) => {
        setReturnResult(data);
        setSucceeded(true);
      },
    });
  };

  const reset = () => {
    setSucceeded(false);
    setReturnResult(null);
    setSelectedLoan(null);
    setLoanQuery('');
  };

  const isOverdue = selectedLoan && new Date(selectedLoan.due_date) < new Date();

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          shape="square"
          onClick={() => navigate(-1)}
          className="border-2 border-bauhaus-black hover:bg-bauhaus-blue transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </Button>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Return Book Transaction</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!succeeded ? (
            <Card decoration="square" decorationColor="bg-bauhaus-blue" className="h-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="border-b-4 border-bauhaus-black pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                    <span className="bg-bauhaus-blue text-white w-8 h-8 flex items-center justify-center border-2 border-bauhaus-black">1</span>
                    Find Active Loan
                  </h2>
                </div>

                {/* Loan search */}
                <div className="flex flex-col gap-4 relative">
                  <label className="font-bold uppercase tracking-widest text-sm">Search by Student Name or Email</label>
                  <div className="relative">
                    <Input
                      placeholder="SEARCH STUDENT..."
                      value={loanQuery}
                      onChange={(e) => {
                        setLoanQuery(e.target.value);
                        setShowResults(true);
                        setSelectedLoan(null);
                      }}
                      onFocus={() => setShowResults(true)}
                      className="uppercase"
                    />
                    {isFetching && (
                      <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-bauhaus-blue" />
                    )}
                    {showResults && loanQuery.length >= 2 && (
                      <div className="absolute z-20 left-0 right-0 mt-2 bg-white border-4 border-bauhaus-black shadow-bauhaus-md max-h-72 overflow-y-auto">
                        {loanResults.length > 0 ? (
                          loanResults.map((loan) => (
                            <div
                              key={loan.loan_id}
                              className="p-4 hover:bg-bauhaus-blue hover:text-white cursor-pointer border-b-2 border-bauhaus-black last:border-b-0 font-bold uppercase transition-colors"
                              onClick={() => {
                                setSelectedLoan(loan);
                                setLoanQuery(loan.student_name);
                                setShowResults(false);
                              }}
                            >
                              <div className="flex justify-between">
                                <span>{loan.student_name}</span>
                                <span className="opacity-60 text-xs">Loan #{loan.loan_id}</span>
                              </div>
                              <div className="text-xs opacity-80 mt-1">{loan.book_title}</div>
                              <div className="text-xs opacity-60">Due: {loan.due_date?.slice(0, 10)}</div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-gray-500 font-bold uppercase">No active loans found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected loan detail */}
                {selectedLoan && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 p-6 border-4 border-bauhaus-black border-dashed">
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-black uppercase text-gray-500">Borrower</div>
                      <div className="font-bold text-xl">{selectedLoan.student_name}</div>
                      <div className="text-sm font-bold tracking-widest opacity-70">{selectedLoan.student_email}</div>
                      <div className="text-sm font-bold opacity-60">{selectedLoan.faculty} · Year {selectedLoan.year}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-black uppercase text-gray-500">Book &amp; Due Date</div>
                      <div className="font-bold text-lg leading-tight">{selectedLoan.book_title}</div>
                      <div className="font-black text-xl">{selectedLoan.due_date?.slice(0, 10)}</div>
                      <Badge variant={isOverdue ? 'error' : 'primary'}>
                        {isOverdue ? 'OVERDUE' : 'ON TIME'}
                      </Badge>
                      {selectedLoan.fine > 0 && (
                        <div className="font-black text-bauhaus-red text-sm">Fine: ¥{selectedLoan.fine}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t-4 border-bauhaus-black flex justify-end">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="py-4 px-12 text-xl shadow-bauhaus-md"
                    disabled={!selectedLoan || returnMutation.isPending}
                  >
                    {returnMutation.isPending ? (
                      <><Loader2 size={20} className="animate-spin" /> Processing...</>
                    ) : (
                      'Confirm Return'
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card decoration="circle" decorationColor="bg-bauhaus-yellow" className="h-full flex flex-col items-center justify-center text-center p-12">
              <div className="bg-bauhaus-blue text-white p-6 border-4 border-bauhaus-black mb-8">
                <RefreshCw size={80} strokeWidth={2.5} />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Book Returned</h2>
              <p className="text-xl font-bold mb-2 max-w-md">
                {returnResult?.transaction?.book_title || 'The book'} has been successfully returned.
              </p>
              {returnResult?.transaction?.fine > 0 && (
                <div className="bg-bauhaus-red text-white px-6 py-3 border-4 border-bauhaus-black font-black uppercase tracking-wider mb-6">
                  Fine Applied: ¥{returnResult.transaction.fine}
                </div>
              )}
              <div className="flex gap-4 mt-4">
                <Button variant="outline" onClick={reset} className="py-3 px-8">Return Another</Button>
                <Button variant="primary" onClick={() => navigate('/')} className="py-3 px-8 shadow-bauhaus-sm">Back to Dashboard</Button>
              </div>
            </Card>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="flex flex-col gap-8">
          <Card decoration="triangle" decorationColor="bg-bauhaus-blue" className="bg-bauhaus-black text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-2 border-white/20 pb-2">Return Summary</h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-blue">Book</span>
                <span className="font-bold text-lg">{selectedLoan ? selectedLoan.book_title : 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-yellow">Borrower</span>
                <span className="font-bold text-lg">{selectedLoan ? selectedLoan.student_name : 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-red">Fine (if late)</span>
                <span className="font-bold">{selectedLoan?.fine > 0 ? `¥${selectedLoan.fine}` : 'No fine'}</span>
              </div>
            </div>
          </Card>

          <Card className="bg-bauhaus-blue text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-bauhaus-red -translate-y-1/2 translate-x-1/2 rotate-45 border-4 border-bauhaus-black" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} />
                <span className="font-black uppercase tracking-widest text-xs">Library Policy</span>
              </div>
              <p className="font-bold text-sm leading-relaxed">
                Late returns incur a ¥5 daily fine. Fines must be paid before the next borrow.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
