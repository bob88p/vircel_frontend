import React from 'react';
import { Search, Filter, RefreshCw, ArrowRightLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';

export default function Circulation() {
  const logs = [
    { id: 'TX-901', type: 'Checkout', book: 'The Elements of Typographic Style', patron: 'Alice Smith', date: 'Oct 24, 2026', due: 'Nov 07, 2026', status: 'active' },
    { id: 'TX-902', type: 'Return', book: 'Clean Code', patron: 'Bob Jones', date: 'Oct 24, 2026', due: '-', status: 'returned' },
    { id: 'TX-903', type: 'Renewal', book: 'Design Systems', patron: 'Charlie Brown', date: 'Oct 23, 2026', due: 'Nov 06, 2026', status: 'active' },
    { id: 'TX-904', type: 'Checkout', book: 'Refactoring UI', patron: 'Diana Prince', date: 'Sep 10, 2026', due: 'Sep 24, 2026', status: 'overdue' },
    { id: 'TX-905', type: 'Return', book: 'System Design Interview', patron: 'Evan Wright', date: 'Oct 22, 2026', due: '-', status: 'returned' },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-white p-8 border-4 border-bauhaus-black shadow-bauhaus-lg">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">Circulation Logs</h1>
          <p className="text-xl font-bold tracking-widest text-bauhaus-blue uppercase">Track checkouts, returns & renewals</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="py-3 px-6 shadow-bauhaus-md">
            <Filter size={20} strokeWidth={2.5} />
            Filter
          </Button>
          <Button variant="primary" className="py-3 px-6 shadow-bauhaus-md">
            <ArrowRightLeft size={20} strokeWidth={2.5} />
            New Transaction
          </Button>
        </div>
      </div>

      <Card decoration="circle" decorationColor="bg-bauhaus-yellow">
        <div className="flex justify-between mb-8 pb-4 border-b-4 border-bauhaus-black items-end">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Recent Transactions</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">Last 30 days</div>
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" shape="square" className="p-3 border-2 border-transparent hover:border-bauhaus-black">
              <RefreshCw size={24} strokeWidth={2.5} />
            </Button>
            <div className="w-[300px]">
              <Input icon={Search} placeholder="SEARCH LOGS..." className="uppercase bg-canvas" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-bauhaus-black bg-canvas">
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Transaction ID</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Type</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Item</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Patron</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Date</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Due Date</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={log.id} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-4 font-black">{log.id}</td>
                  <td className="p-4 font-bold uppercase">{log.type}</td>
                  <td className="p-4 font-medium">{log.book}</td>
                  <td className="p-4 font-medium">{log.patron}</td>
                  <td className="p-4 font-medium">{log.date}</td>
                  <td className="p-4 font-medium text-bauhaus-red">{log.due}</td>
                  <td className="p-4">
                    <Badge variant={log.status === 'active' ? 'primary' : log.status === 'overdue' ? 'error' : 'neutral'}>
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
