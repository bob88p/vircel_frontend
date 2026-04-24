import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Mail, Phone } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';

export default function Customers() {
  const navigate = useNavigate();
  const customers = [
    { id: 'C-1042', name: 'Eleanor Vance', email: 'e.vance@example.com', phone: '(555) 012-3456', status: 'isstill', joined: 'Mar 2024', activeLoans: 3 },
    { id: 'C-1043', name: 'Theodora Crain', email: 'theo.c@example.com', phone: '(555) 987-6543', status: 'overdue', joined: 'Jan 2023', activeLoans: 5 },
    { id: 'C-1044', name: 'Luke Sanderson', email: 'luke.s@example.com', phone: '(555) 456-7890', status: 'returned', joined: 'Nov 2025', activeLoans: 1 },
    { id: 'C-1045', name: 'Arthur Conan', email: 'arthur@example.com', phone: '(555) 111-2222', status: 'inactive', joined: 'Feb 2022', activeLoans: 0 },
    { id: 'C-1046', name: 'Agatha Christie', email: 'agatha@example.com', phone: '(555) 333-4444', status: 'isstill', joined: 'May 2026', activeLoans: 2 },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-bauhaus-blue p-8 border-4 border-bauhaus-black shadow-bauhaus-lg text-white">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">Customers Directory</h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-black inline-block px-2">MANAGE PATRONS & MEMBERSHIPS</p>
        </div>
        <Button variant="yellow" className="py-3 px-6 shadow-bauhaus-md">
          <UserPlus size={20} strokeWidth={2.5} />
          New Member
        </Button>
      </div>

      <Card decoration="square" decorationColor="bg-bauhaus-red">
        <div className="flex justify-between mb-8 pb-4 border-b-4 border-bauhaus-black items-end">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Patron List</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">Total 3,105 members</div>
          </div>
          <div className="w-[400px]">
            <Input icon={Search} placeholder="SEARCH MEMBERS..." className="uppercase bg-canvas" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-bauhaus-black bg-canvas">
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Member ID</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Name & Contact</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Joined</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm text-center">Active Loans</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, i) => (
                <tr key={customer.id} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-4 font-black">{customer.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-lg uppercase leading-tight">{customer.name}</div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="font-bold text-xs uppercase tracking-widest flex items-center gap-1"><Mail size={14} strokeWidth={2.5} /> {customer.email}</span>
                      <span className="font-bold text-xs uppercase tracking-widest flex items-center gap-1"><Phone size={14} strokeWidth={2.5} /> {customer.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{customer.joined}</td>
                  <td className="p-4 text-center font-black text-2xl">{customer.activeLoans}</td>
                  <td className="p-4">
                    <Badge variant={customer.status === 'isstill' ? 'primary' : customer.status === 'overdue' ? 'error' : 'neutral'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button 
                      variant="outline" 
                      className="text-xs py-2 px-4 shadow-[2px_2px_0px_0px_#121212]"
                      onClick={() => navigate(`/customer/${customer.id}`)}
                    >
                      View Profile
                    </Button>
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
