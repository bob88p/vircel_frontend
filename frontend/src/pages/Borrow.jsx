import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, User, Calendar, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';

export default function Borrow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bookId: '',
    customerId: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 14 days
  });

  const books = [
    { id: 'B-001', title: 'The Elements of Typographic Style', author: 'Robert Bringhurst' },
    { id: 'B-003', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
    { id: 'B-006', title: 'The Visual Display of Quantitative Information', author: 'Edward Tufte' },
  ];

  const customers = [
    { id: 'C-1042', name: 'Eleanor Vance', status: 'active' },
    { id: 'C-1044', name: 'Luke Sanderson', status: 'active' },
    { id: 'C-1046', name: 'Agatha Christie', status: 'active' },
  ];

  const [bookSearch, setBookSearch] = useState('');
  const [showBookResults, setShowBookResults] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerResults, setShowCustomerResults] = useState(false);

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(bookSearch.toLowerCase()) || 
    b.id.toLowerCase().includes(bookSearch.toLowerCase())
  );

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
    console.log('Borrowing book:', formData);
    setStep(3); // Success step
  };

  const selectedBook = books.find(b => b.id === formData.bookId);
  const selectedCustomer = customers.find(c => c.id === formData.customerId);

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          shape="square" 
          onClick={() => navigate(-1)}
          className="border-2 border-bauhaus-black hover:bg-bauhaus-yellow transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </Button>
        <h1 className="text-4xl font-black uppercase tracking-tighter">New Borrow Transaction</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 || step === 2 ? (
            <Card decoration="square" decorationColor="bg-bauhaus-yellow" className="h-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="border-b-4 border-bauhaus-black pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                    <span className="bg-bauhaus-red text-white w-8 h-8 flex items-center justify-center rounded-none border-2 border-bauhaus-black">1</span>
                    Selection Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4 relative">
                    <label className="font-bold uppercase tracking-widest text-sm">Select Book</label>
                    <div className="relative group">
                      <Input
                        placeholder="SEARCH BOOK..."
                        value={bookSearch}
                        onChange={(e) => {
                          setBookSearch(e.target.value);
                          setShowBookResults(true);
                          if (formData.bookId) setFormData(prev => ({ ...prev, bookId: '' }));
                        }}
                        onFocus={() => setShowBookResults(true)}
                        className="uppercase"
                      />
                      {showBookResults && bookSearch.length > 0 && (
                        <div className="absolute z-20 left-0 right-0 mt-2 bg-white border-4 border-bauhaus-black shadow-bauhaus-md max-h-60 overflow-y-auto">
                          {filteredBooks.length > 0 ? (
                            filteredBooks.map(book => (
                              <div 
                                key={book.id}
                                className="p-4 hover:bg-bauhaus-yellow hover:text-bauhaus-black cursor-pointer border-b-2 border-bauhaus-black last:border-b-0 font-bold uppercase transition-colors"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, bookId: book.id }));
                                  setBookSearch(book.title);
                                  setShowBookResults(false);
                                }}
                              >
                                <div className="flex justify-between">
                                  <span>{book.title}</span>
                                  <span className="opacity-60 text-xs">{book.id}</span>
                                </div>
                                <div className="text-xs opacity-70">{book.author}</div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-gray-500 font-bold uppercase">No books found</div>
                          )}
                        </div>
                      )}
                    </div>
                    {selectedBook && (
                      <div className="bg-bauhaus-yellow/10 p-4 border-2 border-bauhaus-black border-dashed">
                        <div className="text-xs font-black uppercase text-gray-500">Selected Book</div>
                        <div className="font-bold">{selectedBook.title}</div>
                        <div className="text-sm">{selectedBook.author}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 relative">
                    <label className="font-bold uppercase tracking-widest text-sm">Select Customer</label>
                    <div className="relative group">
                      <Input
                        placeholder="SEARCH CUSTOMER..."
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
                                  setFormData(prev => ({ ...prev, customerId: customer.id }));
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
                    {selectedCustomer && (
                      <div className="bg-bauhaus-blue/10 p-4 border-2 border-bauhaus-black border-dashed">
                        <div className="text-xs font-black uppercase text-gray-500">Selected Customer</div>
                        <div className="font-bold">{selectedCustomer.name}</div>
                        <div className="text-sm">ID: {selectedCustomer.id}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="font-bold uppercase tracking-widest text-sm">Due Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full p-4 border-4 border-bauhaus-black font-bold uppercase tracking-tight focus:bg-bauhaus-red focus:text-white transition-colors outline-none bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t-4 border-bauhaus-black flex justify-end">
                  <Button 
                    variant="primary" 
                    type="submit"
                    className="py-4 px-12 text-xl shadow-bauhaus-md"
                    disabled={!formData.bookId || !formData.customerId}
                  >
                    Confirm Borrow
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card decoration="circle" decorationColor="bg-bauhaus-blue" className="h-full flex flex-col items-center justify-center text-center p-12">
              <div className="bg-bauhaus-yellow p-6 border-4 border-bauhaus-black mb-8">
                <CheckCircle2 size={80} strokeWidth={2.5} />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Transaction Successful</h2>
              <p className="text-xl font-bold mb-8 max-w-md">The book has been successfully registered to the customer. Please ensure they are aware of the due date.</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="py-3 px-8">Borrow Another</Button>
                <Button variant="primary" onClick={() => navigate('/')} className="py-3 px-8 shadow-bauhaus-sm">Back to Dashboard</Button>
              </div>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <Card decoration="triangle" decorationColor="bg-bauhaus-red" className="bg-bauhaus-black text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-2 border-white/20 pb-2">Summary</h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-red">Book</span>
                <span className="font-bold text-lg">{selectedBook ? selectedBook.title : 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-yellow">Customer</span>
                <span className="font-bold text-lg">{selectedCustomer ? selectedCustomer.name : 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-blue">Due Date</span>
                <span className="font-black text-2xl">{formData.dueDate}</span>
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
                Items must be returned within 14 days. Overdue items incur a daily fine of 5 EGP.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
