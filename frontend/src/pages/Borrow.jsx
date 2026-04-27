import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Book, User, Calendar, ArrowLeft, CheckCircle2, AlertCircle, Loader2, UserPlus } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { useSearchBooks, useSearchStudents, useBorrowBook } from '../hooks/useTransactions';
import { useAddStudent } from '../hooks/useCustomers';

export default function Borrow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  // Handle initial state from router (e.g. from CustomerProfile)
  useEffect(() => {
    if (location.state?.customerId && location.state?.customerName) {
      setSelectedCustomer({ id: location.state.customerId, name: location.state.customerName });
      setCustomerSearch(location.state.customerName);
    }
  }, [location.state]);

  const [bookSearch, setBookSearch] = useState('');
  const [showBookResults, setShowBookResults] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerResults, setShowCustomerResults] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const { data: bookResults = [], isFetching: isFetchingBooks } = useSearchBooks(bookSearch);
  const { data: customerResults = [], isFetching: isFetchingCustomers } = useSearchStudents(customerSearch);
  const borrowMutation = useBorrowBook();
  const addStudentMutation = useAddStudent();

  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudentData, setNewStudentData] = useState({ name: '', email: '', year: 1, faculty: '', department: '' });

  const handleAddStudent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addStudentMutation.mutate(newStudentData, {
      onSuccess: (data) => {
        setSelectedCustomer(data);
        setCustomerSearch(data.name);
        setIsAddingStudent(false);
        setShowCustomerResults(false);
        setNewStudentData({ name: '', email: '', year: 1, faculty: '', department: '' });
      }
    });
  };

  const handleInputChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook || !selectedCustomer) return;
    
    borrowMutation.mutate({
      student_id: selectedCustomer.id,
      book_id: selectedBook.id,
      staff_id: 1 // Default staff ID
    }, {
      onSuccess: () => {
        setStep(3); // Success step
      }
    });
  };

  const reset = () => {
    setStep(1);
    setSelectedBook(null);
    setSelectedCustomer(null);
    setBookSearch('');
    setCustomerSearch('');
    setDueDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  };

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
                          setSelectedBook(null);
                        }}
                        onFocus={() => setShowBookResults(true)}
                        className="uppercase"
                      />
                      {isFetchingBooks && (
                        <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-bauhaus-black" />
                      )}
                      {showBookResults && bookSearch.length >= 2 && (
                        <div className="absolute z-20 left-0 right-0 mt-2 bg-white border-4 border-bauhaus-black shadow-bauhaus-md max-h-60 overflow-y-auto">
                          {bookResults.length > 0 ? (
                            bookResults.map(book => (
                              <div 
                                key={book.id}
                                className="p-4 hover:bg-bauhaus-yellow hover:text-bauhaus-black cursor-pointer border-b-2 border-bauhaus-black last:border-b-0 font-bold uppercase transition-colors"
                                onClick={() => {
                                  setSelectedBook(book);
                                  setBookSearch(book.title);
                                  setShowBookResults(false);
                                }}
                              >
                                <div className="flex justify-between">
                                  <span>{book.title}</span>
                                  <span className="opacity-60 text-xs">ID: {book.id}</span>
                                </div>
                                <div className="text-xs opacity-70">{book.author}</div>
                                <div className="text-xs opacity-60 mt-1">Available: {book.quantity}</div>
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
                        placeholder="SEARCH STUDENT..."
                        value={customerSearch}
                        onChange={(e) => {
                          setCustomerSearch(e.target.value);
                          setShowCustomerResults(true);
                          setSelectedCustomer(null);
                        }}
                        onFocus={() => setShowCustomerResults(true)}
                        className="uppercase"
                      />
                      {isFetchingCustomers && (
                        <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-bauhaus-blue" />
                      )}
                      {showCustomerResults && customerSearch.length >= 2 && (
                        <div className="absolute z-20 left-0 right-0 mt-2 bg-white border-4 border-bauhaus-black shadow-bauhaus-md max-h-60 overflow-y-auto">
                          {customerResults.length > 0 ? (
                            customerResults.map(customer => (
                              <div 
                                key={customer.id}
                                className="p-4 hover:bg-bauhaus-blue hover:text-white cursor-pointer border-b-2 border-bauhaus-black last:border-b-0 font-bold uppercase transition-colors"
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setCustomerSearch(customer.name);
                                  setShowCustomerResults(false);
                                }}
                              >
                                <div className="flex justify-between">
                                  <span>{customer.name}</span>
                                  <span className="opacity-60 text-xs">ID: {customer.id}</span>
                                </div>
                                <div className="text-xs opacity-70">{customer.email}</div>
                              </div>
                            ))
                          ) : (
                            <div className="p-6 flex flex-col items-center gap-4 text-center">
                              <div className="text-gray-500 font-bold uppercase">No students found</div>
                              <Button 
                                variant="outline" 
                                className="py-2 px-4 shadow-[2px_2px_0px_0px_#121212] text-xs flex items-center gap-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsAddingStudent(true);
                                }}
                              >
                                <UserPlus size={16} strokeWidth={2.5} />
                                Quick Add Student
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {selectedCustomer && (
                      <div className="bg-bauhaus-blue/10 p-4 border-2 border-bauhaus-black border-dashed">
                        <div className="text-xs font-black uppercase text-gray-500">Selected Student</div>
                        <div className="font-bold">{selectedCustomer.name}</div>
                        <div className="text-sm">ID: {selectedCustomer.id}</div>
                      </div>
                    )}

                    {isAddingStudent && (
                      <div className="absolute z-30 top-0 left-0 right-0 bg-white border-4 border-bauhaus-black shadow-bauhaus-lg p-6">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-bauhaus-black pb-2">
                          <h3 className="font-black uppercase tracking-tight">Add New Student</h3>
                          <button onClick={() => setIsAddingStudent(false)} className="text-bauhaus-red font-bold">CANCEL</button>
                        </div>
                        <div className="flex flex-col gap-4">
                          <Input 
                            placeholder="NAME" 
                            value={newStudentData.name} 
                            onChange={e => setNewStudentData({...newStudentData, name: e.target.value})}
                            className="uppercase"
                          />
                          <Input 
                            placeholder="EMAIL" 
                            type="email"
                            value={newStudentData.email} 
                            onChange={e => setNewStudentData({...newStudentData, email: e.target.value})}
                            className="uppercase"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <Input 
                              placeholder="YEAR" 
                              type="number"
                              value={newStudentData.year} 
                              onChange={e => setNewStudentData({...newStudentData, year: parseInt(e.target.value)})}
                              className="uppercase"
                            />
                            <Input 
                              placeholder="FACULTY" 
                              value={newStudentData.faculty} 
                              onChange={e => setNewStudentData({...newStudentData, faculty: e.target.value})}
                              className="uppercase"
                            />
                          </div>
                          <Input 
                            placeholder="DEPARTMENT" 
                            value={newStudentData.department} 
                            onChange={e => setNewStudentData({...newStudentData, department: e.target.value})}
                            className="uppercase"
                          />
                          <Button 
                            variant="primary" 
                            onClick={handleAddStudent}
                            disabled={addStudentMutation.isPending}
                            className="w-full shadow-bauhaus-sm"
                          >
                            {addStudentMutation.isPending ? 'ADDING...' : 'ADD STUDENT'}
                          </Button>
                        </div>
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
                      value={dueDate}
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
                    disabled={!selectedBook || !selectedCustomer || borrowMutation.isPending}
                  >
                    {borrowMutation.isPending ? (
                      <><Loader2 size={20} className="animate-spin mr-2 inline" /> Processing...</>
                    ) : (
                      'Confirm Borrow'
                    )}
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
              <p className="text-xl font-bold mb-8 max-w-md">The book has been successfully registered to the student. Please ensure they are aware of the due date.</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={reset} className="py-3 px-8">Borrow Another</Button>
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
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-yellow">Student</span>
                <span className="font-bold text-lg">{selectedCustomer ? selectedCustomer.name : 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-bauhaus-blue">Due Date</span>
                <span className="font-black text-2xl">{dueDate}</span>
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
