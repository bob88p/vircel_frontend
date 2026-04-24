import React from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function Analytics() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-bauhaus-black p-8 border-4 border-bauhaus-black shadow-bauhaus-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 border-[16px] border-bauhaus-yellow rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="relative z-10">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">Advanced Analytics</h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-yellow text-bauhaus-black inline-block px-2 uppercase">In-depth insights into operations</p>
        </div>
        <Button variant="yellow" className="py-3 px-6 shadow-bauhaus-md relative z-10">
          <Download size={20} strokeWidth={2.5} />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card decoration="square" decorationColor="bg-bauhaus-blue">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 border-b-4 border-bauhaus-black pb-2">Average Loan Duration</h3>
          <div className="text-5xl font-black tracking-tighter">14.2<span className="text-2xl">D</span></div>
          <div className="text-sm font-bold tracking-widest uppercase mt-4 text-[#4ADE80] bg-bauhaus-black inline-block px-2">TARGET: 14 DAYS</div>
        </Card>
        
        <Card decoration="circle" decorationColor="bg-bauhaus-red">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 border-b-4 border-bauhaus-black pb-2">Collection Turnover</h3>
          <div className="text-5xl font-black tracking-tighter">2.4x</div>
          <div className="text-sm font-bold tracking-widest uppercase mt-4 text-[#4ADE80] bg-bauhaus-black inline-block px-2">+0.3X FROM LAST YEAR</div>
        </Card>

        <Card decoration="triangle" decorationColor="bg-bauhaus-yellow">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 border-b-4 border-bauhaus-black pb-2">Digital vs Physical</h3>
          <div className="text-5xl font-black tracking-tighter">34% <span className="text-2xl font-bold text-gray-400">/</span> 66%</div>
          <div className="text-sm font-bold tracking-widest uppercase mt-4 text-white bg-bauhaus-blue inline-block px-2">DIGITAL GROWING</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col min-h-[400px]" decoration="circle" decorationColor="bg-white">
          <div className="flex justify-between items-center mb-8 pb-4 border-b-4 border-bauhaus-black">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Circulation Trends</h2>
              <div className="text-sm font-bold tracking-widest uppercase mt-2">Monthly Checkouts</div>
            </div>
            <div className="flex gap-2">
              <Badge variant="primary">Checkouts</Badge>
              <Badge variant="neutral">Returns</Badge>
            </div>
          </div>
          
          <div className="flex-1 border-4 border-dashed border-bauhaus-black bg-canvas flex flex-col items-center justify-center gap-4 text-bauhaus-black relative overflow-hidden">
            {/* Abstract representation of chart using Bauhaus shapes */}
            <div className="absolute bottom-0 flex items-end gap-4 w-full px-8 h-full pb-8">
                <div className="w-full bg-bauhaus-blue h-1/4 border-t-4 border-bauhaus-black"></div>
                <div className="w-full bg-bauhaus-yellow h-2/4 border-t-4 border-bauhaus-black"></div>
                <div className="w-full bg-bauhaus-red h-3/4 border-t-4 border-bauhaus-black relative"><div className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-bauhaus-black rounded-full"></div></div>
                <div className="w-full bg-bauhaus-black h-full relative"><div className="absolute top-[-2px] left-0 w-full border-t-4 border-white border-dashed"></div></div>
            </div>
            
            <div className="relative z-10 bg-white border-4 border-bauhaus-black p-4 shadow-bauhaus-sm flex flex-col items-center text-center max-w-xs">
                <BarChart3 size={48} strokeWidth={2} />
                <div className="font-bold uppercase tracking-wider mt-2">Interactive Chart</div>
                <div className="text-xs uppercase tracking-widest mt-1">Requires Integration</div>
            </div>
          </div>
        </Card>
        
        <Card decoration="square" decorationColor="bg-bauhaus-blue">
          <div className="mb-8 pb-4 border-b-4 border-bauhaus-black">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Top Titles</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">Most circulated items</div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-bauhaus-black bg-canvas">
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Rank</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Title & Category</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm text-right">Checkouts</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, title: 'The Design of Everyday Things', category: 'Design', count: 142 },
                { rank: 2, title: 'Clean Code', category: 'Technology', count: 128 },
                { rank: 3, title: 'Thinking, Fast and Slow', category: 'Psychology', count: 115 },
                { rank: 4, title: 'Sapiens', category: 'History', count: 98 },
                { rank: 5, title: 'A Pattern Language', category: 'Architecture', count: 87 }
              ].map((item, i) => (
                <tr key={item.rank} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-4 font-black text-2xl">#{item.rank}</td>
                  <td className="p-4">
                    <div className="font-bold uppercase">{item.title}</div>
                    <div className="text-sm uppercase tracking-widest">{item.category}</div>
                  </td>
                  <td className="p-4 font-black text-xl text-right">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
