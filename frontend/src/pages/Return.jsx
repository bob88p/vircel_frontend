import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, User, Calendar, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';

export default function Return() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bookId: '',
    customerId: '',
    returnDate: new Date().toISOString().split('T')[0],
  });

  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerResults, setShowCustomerResults] = useState(false);

  const customers = [
    { id: 'C-1042', name: 'Eleanor Vance' },
    { id: 'C-1044', name: 'Luke Sanderson' },
    { id: 'C-1046', name: 'Agatha Christie' },
  ];

  const currentlyBorrowed = [
    { id: 'B-001', title: 'The Elements of Typographic Style', borrower: 'Eleanor Vance', borrowerId: 'C-1042', dueDate: '2026-04-30' },
    { id: 'B-003', title: 'Designing Data-Intensive Applications', borrower: 'Luke Sanderson', borrowerId: 'C-1044', dueDate: '2026-04-20' },
    { id: 'B-006', title: 'The Visual Display of Quantitative Information', borrower: 'Agatha Christie', borrowerId: 'C-1046', dueDate: '2026-05-05' },
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
    c.id.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Returning book:', formData);
    setStep(3); // Success step
  };

  const selectedTransaction = currentlyBorrowed.find(b => b.id === formData.bookId);

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
          {step === 1 || step === 2 ? (
            <Card decoration="square" decorationColor="bg-bauhaus-blue" className="h-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="border-b-4 border-bauhaus-black pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                    <span className="bg-bauhaus-blue text-white w-8 h-8 flex items-center justify-center rounded-none border-2 border-bauhaus-black">1</span>
                    Return Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4 relative">
                    <div className="flex justify-between items-end">
                      <label className="font-bold uppercase tracking-widest text-sm">Select Customer</label>
                      <button 
                        type="button"
                        onClick={() => navigate('/customers')}
                        className="text-xs font-black uppercase text-bauhaus-blue hover:underline"
                      >
                        + Add New
                      </button>
                    </div>
                    <div className="relative group">
                      <Input
                        placeholder="SEARCH BY NAME OR ID..."
                        value={customerSearch}
                        onChange={(e) => {
                          setCustomerSearch(e.target.value);
                          setShowCustomerResults(true);
                          if (formData.customerId) setFormData(prev => ({ ...prev, customerId: '' }));
                        }}
                        onFocus={() => setShowCustomerResults(true)}
                        className="uppercase"
                      />
                      {showCustomerResults && customerSearch.length > 0 && (
                        <div className="absolute z-20 left-0 right-0 mt-2 bg-white border-4 border-bauhaus-black shadow-bauhaus-md max-h-60 overflow-y-auto">
                          {filteredCustomers.length > 0 ? (
                            filteredCustomers.map(customer => (
                              <div 
                                key={customer.id}
                                className="p-4 hover:bg-bauhaus-blue hover:text-white cursor-pointer border-b-2 border-bauhaus-black last:border-b-0 font-bold uppercase transition-colors"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, customerId: customer.id, bookId: '' }));
                                  setCustomerSearch(customer.name);
                                  setShowCustomerResults(false);
                                }}
                              >
                                <div className="flex justify-between">
                                  <span>{customer.name}</span>
                                  <span className="opacity-60 text-xs">{customer.id}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-gray-500 font-bold uppercase">No customers found</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="font-bold uppercase tracking-widest text-sm">Select Borrowed Book</label>
                    <select 
                      name="bookId"
                      value={formData.bookId}
                      onChange={handleInputChange}
                      className="w-full p-4 border-4 border-bauhaus-black font-bold uppercase tracking-tight focus:bg-bauhaus-yellow transition-colors outline-none appearance-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={!formData.customerId}
                    >
                      {!formData.customerId ? (
                        <option value="">-- SELECT CUSTOMER FIRST --</option>
                      ) : (
                        <>
                          <option value="">-- SELECT BOOK TO RETURN --</option>
                          {currentlyBorrowed
                            .filter(book => book.borrowerId === formData.customerId)
                            .map(item => (
                              <option key={item.id} value={item.id}>{item.title}</option>
                            ))
                          }
                        </>
                      )}
                    </select>
                    {formData.customerId && currentlyBorrowed.filter(book => book.borrowerId === formData.customerId).length === 0 && (
                      <div className="text-xs font-bold text-bauhaus-red uppercase tracking-widest mt-1">
                        This customer has no active borrows.
                      </div>
                    )}
                  </div>
                </div>

                {selectedTransaction && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 p-6 border-4 border-bauhaus-black border-dashed">
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-black uppercase text-gray-500">Borrower Information</div>
                      <div className="font-bold text-xl">{selectedTransaction.borrower}</div>
                      <div className="text-sm font-bold tracking-widest opacity-70">ID: {selectedTransaction.borrowerId}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-black uppercase text-gray-500">Due Date Status</div>
                      <div className="font-black text-xl">{selectedTransaction.dueDate}</div>
                      <Badge variant={new Date(selectedTransaction.dueDate) < new Date() ? 'error' : 'neutral'}>
                        {new Date(selectedTransaction.dueDate) < new Date() ? 'OVERDUE' : 'ON TIME'}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <label className="font-bold uppercase tracking-widest text-sm">Return Date</label>
                  <input 
                    type="date" 
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full p-4 border-4 border-bauhaus-black font-bold uppercase tracking-tight focus:bg-bauhaus-red focus:text-white transition-colors outline-none bg-white"
                    required
                  />
                </div>

                <div className="pt-4 border-t-4 border-bauhaus-black flex justify-end">
                  <Button 
                    variant="secondary" 
                    type="submit"
                    className="py-4 px-12 text-xl shadow-bauhaus-md"
                    disabled={!formData.bookId}
                  >
                    Confirm Return
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card decoration="circle" decorationColor="bg-bauhaus-yellow" className="h-full flex flex-col items-center justify-center text-center p-12">
              <div className="bg-bauhaus-blue text-white p-6 border-4 border-bauhaus-black mb-8">
                <RefreshCw size={80} strokeWidth={2.5} className="animate-spin-slow" />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Book Returned</h2>
              <p className="text-xl font-bold mb-8 max-w-md">The book has been successfully returned and updated in the inventory catalog.</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="py-3 px-8">Return Another</Button>
                <Button variant="primary" onClick={() => navigate('/')} className="py-3 px-8 shadow-bauhaus-sm">Back to Dashboard</Button>
              </div>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <Card decoration="triangle" decorationColor="bg-bauhaus-blue" className="bg-bauhaus-black text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-2 border-white/20 pb-2">Return Summary</h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-blue">Book</span>
                <span className="font-bold text-lg">{selectedTransaction ? selectedTransaction.title : 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-yellow">Borrower</span>
                <span className="font-bold text-lg">{selectedTransaction ? selectedTransaction.borrower : 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Customer ID</span>
                <span className="font-bold">{formData.customerId || (selectedTransaction ? selectedTransaction.borrowerId : '---')}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-red">Condition Check</span>
                <span className="font-bold">Good / Perfect</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
