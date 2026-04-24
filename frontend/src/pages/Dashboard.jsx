import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, BookOpen, Users, Clock, AlertTriangle } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

function StatCard({ title, value, icon: Icon, trend, trendValue, colorClass }) {
  return (
    <Card decoration="square" decorationColor={colorClass} className="h-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-2">{title}</h2>
            <div className="text-5xl font-black tracking-tighter">{value}</div>
          </div>
          <div className={`p-3 border-4 border-bauhaus-black ${colorClass}`}>
            <Icon size={32} strokeWidth={2.5} className="text-bauhaus-black" />
          </div>
        </div>

      </div>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const recentActivity = [
    { id: 1, action: 'Checkout', book: 'The Design of Everyday Things', user: 'Alice Smith', time: '10 mins ago', status: 'Taken' },
    { id: 2, action: 'Return', book: 'Clean Code', user: 'Bob Jones', time: '1 hour ago', status: 'returned' },
    { id: 3, action: 'Overdue Notice', book: 'Refactoring UI', user: 'Charlie Brown', time: '2 hours ago', status: 'overdue' },
    { id: 4, action: 'Checkout', book: 'System Design Interview', user: 'Diana Prince', time: '3 hours ago', status: 'Taken' },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-bauhaus-blue p-8 border-4 border-bauhaus-black shadow-bauhaus-lg relative overflow-hidden text-white">
        {/* Geometric decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-red rounded-full translate-x-1/3 -translate-y-1/3 border-8 border-bauhaus-black" />
        <div className="absolute bottom-0 right-32 w-32 h-32 bg-bauhaus-yellow rotate-45 translate-y-1/2 border-4 border-bauhaus-black" />

        <div className="relative z-10">
          <h1 className="text-6xl font-black tracking-tighter mb-2 leading-none">
            KAFR Elsheikh  <br />Library
          </h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-black text-white inline-block px-2">TODAY'S GOOD DAY</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <Button 
            variant="yellow" 
            className="text-lg py-4 px-8 shadow-bauhaus-md"
            onClick={() => navigate('/borrow')}
          >
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Books" value="12,482" icon={BookOpen} trend="up" trendValue="+14%" colorClass="bg-bauhaus-yellow" />
        <StatCard title="total Customers" value="3,105" icon={Users} trend="up" trendValue="+5%" colorClass="bg-white" />
        <StatCard title="Overdue Books" value="142" icon={Clock} trend="down" trendValue="-2%" colorClass="bg-bauhaus-red" />
        <StatCard title="Total Transactions " value="18" icon={AlertTriangle} trend="down" trendValue="-10%" colorClass="bg-bauhaus-blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 flex flex-col" decoration="circle" decorationColor="bg-bauhaus-blue">
          <div className="mb-8 border-b-4 border-bauhaus-black pb-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Recent Actions</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">Latest system events</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-bauhaus-black bg-canvas">
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Action</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Book</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">customer</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Date</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item, i) => (
                  <tr key={item.id} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4 font-bold uppercase">{item.action}</td>
                    <td className="p-4 font-medium">{item.book}</td>
                    <td className="p-4 font-medium">{item.user}</td>
                    <td className="p-4 font-medium text-sm">{item.time}</td>
                    <td className="p-4">
                      <Badge variant={item.status === 'Taken' ? 'primary' : item.status === 'overdue' ? 'error' : 'neutral'}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card decoration="triangle" decorationColor="bg-bauhaus-yellow" className="bg-bauhaus-yellow">
          <div className="mb-8 border-b-4 border-bauhaus-black pb-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Books status</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">Taken books vs Returned books</div>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { label: 'CHECKED OUT', value: 78, color: 'bg-bauhaus-blue' },
              { label: 'Still On Time', value: 40, color: 'bg-white' },
              { label: 'Returned', value: 45, color: 'bg-white' },
              { label: 'Overdue', value: 12, color: 'bg-bauhaus-red' },

            ].map((cat, i) => (
              <div key={cat.label} className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="font-bold uppercase tracking-wider text-sm">{cat.label}</span>
                  <span className="font-black text-xl leading-none">{cat.value}</span>
                </div>
                <div className="h-6 w-full bg-white border-2 border-bauhaus-black flex">
                  <div className={`${cat.color} border-r-2 border-bauhaus-black transition-all duration-500`} style={{ width: `${cat.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
