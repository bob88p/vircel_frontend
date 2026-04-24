import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Book, Clock, AlertTriangle, CheckCircle2, History, User } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function CustomerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock customer data - Enforcing "One Loan at a Time" logic
  const [customer, setCustomer] = useState({
    id: id || 'C-1042',
    name: 'Eleanor Vance',
    email: 'e.vance@example.com',
    phone: '(555) 012-3456',
    status: 'isstill', // isstill means they have an active loan
    joined: 'Mar 2024',
    address: '123 Bauhaus St, Berlin, Germany',
    bio: 'Dedicated reader of design and typography books.',
    // Policy: Only one active loan allowed
    activeLoan: { 
      id: 'B-001', 
      title: 'The Elements of Typographic Style', 
      issueDate: '2026-04-01',
      dueDate: '2026-04-30', 
      status: 'active' 
    },
    history: [
      { id: 'H-901', book: 'Clean Code', action: 'Returned', date: '2026-03-15' },
      { id: 'H-902', book: 'Refactoring UI', action: 'Returned', date: '2026-02-28' },
      { id: 'H-903', book: 'Thinking with Type', action: 'Returned', date: '2026-01-10' },
    ]
  });

  const hasActiveLoan = !!customer.activeLoan;

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-20">
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
        <div className="flex gap-4">
          <Button variant="outline" className="px-6">Edit Profile</Button>
          <Button variant="primary" className="px-6 shadow-bauhaus-md">Export Logs</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <Card decoration="circle" decorationColor="bg-bauhaus-blue" className="bg-white p-0 overflow-hidden">
            <div className="p-8 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-bauhaus-black text-white flex items-center justify-center text-3xl font-black border-4 border-bauhaus-black shadow-bauhaus-sm">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase leading-tight">{customer.name}</h2>
                  <div className="text-sm font-bold tracking-widest text-bauhaus-black/60 uppercase mt-1">{customer.id}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t-4 border-bauhaus-black pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bauhaus-yellow border-2 border-bauhaus-black flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{customer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bauhaus-blue border-2 border-bauhaus-black flex items-center justify-center text-white">
                    <Phone size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bauhaus-red border-2 border-bauhaus-black flex items-center justify-center text-white">
                    <Calendar size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-tight uppercase">Member Since {customer.joined}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Eligibility Logic Card */}
          <Card decoration="square" decorationColor={hasActiveLoan ? 'bg-bauhaus-red' : 'bg-green-500'} className={hasActiveLoan ? 'bg-bauhaus-red text-white' : 'bg-green-500 text-white'}>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                {hasActiveLoan ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                Loan Eligibility
              </h3>
              <p className="text-sm font-bold leading-tight opacity-90 uppercase tracking-wide">
                {hasActiveLoan 
                  ? "SYSTEM LOCK: ONE LOAN PER CUSTOMER POLICY. THIS MEMBER MUST RETURN THE CURRENT BOOK BEFORE STARTING A NEW LOAN."
                  : "ELIGIBLE: NO ACTIVE LOANS DETECTED. MEMBER MAY BORROW A NEW TITLE."
                }
              </p>
              {hasActiveLoan && (
                <Button 
                  variant="yellow" 
                  className="w-full mt-2 text-bauhaus-black py-3"
                  onClick={() => navigate('/return')}
                >
                  Return Current Book
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Status & Logs (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Current Status Section */}
          <Card decoration="triangle" decorationColor="bg-bauhaus-yellow">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-bauhaus-black pb-4 flex items-center gap-3">
              <Clock className="text-bauhaus-blue" />
              Current Circulation Status
            </h3>
            
            {hasActiveLoan ? (
              <div className="border-4 border-bauhaus-black p-6 bg-canvas flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-bauhaus-md">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white border-4 border-bauhaus-black flex items-center justify-center">
                    <Book size={32} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-bauhaus-black/60">Currently Holding</div>
                    <div className="text-2xl font-black uppercase tracking-tight leading-none mt-1">{customer.activeLoan.title}</div>
                    <div className="flex gap-4 mt-2 text-sm font-bold uppercase tracking-wider">
                      <span>Issued: {customer.activeLoan.issueDate}</span>
                      <span className="text-bauhaus-red">Due: {customer.activeLoan.dueDate}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="primary" className="text-lg py-2 px-6">ACTIVE LOAN</Badge>
              </div>
            ) : (
              <div className="border-4 border-dashed border-bauhaus-black/20 p-12 text-center bg-gray-50">
                <div className="text-2xl font-black uppercase tracking-widest opacity-20 italic">No Books Currently Borrowed</div>
                <Button 
                  variant="primary" 
                  className="mt-6 px-10"
                  onClick={() => navigate('/borrow')}
                >
                  Borrow A Book
                </Button>
              </div>
            )}
          </Card>

          {/* Activity Logs Section */}
          <Card decoration="square" decorationColor="bg-bauhaus-black">
            <div className="flex justify-between items-center mb-6 border-b-4 border-bauhaus-black pb-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                <History className="text-bauhaus-red" />
                Transaction Logs
              </h3>
              <div className="text-xs font-bold uppercase tracking-widest">Historical Data</div>
            </div>

            <div className="flex flex-col">
              <div className="grid grid-cols-12 gap-4 p-4 border-b-4 border-bauhaus-black bg-canvas font-black uppercase text-xs tracking-widest">
                <div className="col-span-6">Book Title</div>
                <div className="col-span-3 text-center">Action</div>
                <div className="col-span-3 text-right">Date</div>
              </div>
              {customer.history.map((log, i) => (
                <div key={log.id} className={`grid grid-cols-12 gap-4 p-4 border-b-2 border-bauhaus-black items-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="col-span-6 font-bold uppercase tracking-tight">{log.book}</div>
                  <div className="col-span-3 text-center">
                    <Badge variant="neutral" className="w-full text-center py-1">{log.action}</Badge>
                  </div>
                  <div className="col-span-3 text-right font-medium text-sm">{log.date}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

