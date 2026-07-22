
'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { MOCK_ORDERS } from '@/lib/food-data';
import { TrendingUp, DollarSign, ShoppingBag, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function AnalyticsDashboard() {
  // Aggregate data for charts
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      sales: 0,
      count: 0
    }));

    MOCK_ORDERS.forEach(order => {
      if (order.hour !== undefined) {
        hours[order.hour].sales += order.total;
        hours[order.hour].count += 1;
      }
    });

    return hours.filter(h => h.sales > 0);
  }, []);

  const dailyRevenue = MOCK_ORDERS.reduce((acc, curr) => acc + curr.total, 0);
  const totalOrders = MOCK_ORDERS.length;
  const averageOrderValue = dailyRevenue / totalOrders;

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-headline text-black uppercase tracking-tighter">Business Insights</h1>
          <p className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest">Real-time performance monitoring</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-4 py-2 rounded-none font-black uppercase tracking-widest">
          System Live
        </Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-none border-2 border-black shadow-none bg-white p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-16 h-16" />
          </div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Today's Revenue</p>
          <h2 className="text-4xl font-black text-black leading-none">KES {dailyRevenue.toLocaleString()}</h2>
          <div className="mt-4 flex items-center gap-2 text-emerald-600 font-black text-[12px] uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" /> +12.5% from yesterday
          </div>
        </Card>

        <Card className="rounded-none border-2 border-black shadow-none bg-white p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShoppingBag className="w-16 h-16" />
          </div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Total Orders</p>
          <h2 className="text-4xl font-black text-black leading-none">{totalOrders}</h2>
          <div className="mt-4 flex items-center gap-2 text-primary font-black text-[12px] uppercase tracking-widest">
            <ArrowUpRight className="w-4 h-4" /> 4 Active now
          </div>
        </Card>

        <Card className="rounded-none border-2 border-black shadow-none bg-white p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clock className="w-16 h-16" />
          </div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Average Ticket</p>
          <h2 className="text-4xl font-black text-black leading-none">KES {averageOrderValue.toLocaleString()}</h2>
          <div className="mt-4 flex items-center gap-2 text-muted-foreground font-black text-[12px] uppercase tracking-widest">
            Premium Orders Lead
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="rounded-none border-2 border-black shadow-none bg-white overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" /> Hourly Sales Velocity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10, fontWeight: 900 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10, fontWeight: 900 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: 0, border: '2px solid black', fontWeight: 900 }} 
                  itemStyle={{ color: '#ff0000' }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="sales" 
                  stroke="#ff0000" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#ff0000', strokeWidth: 2, stroke: 'white' }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-none border-2 border-black shadow-none bg-white overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-primary" /> Transaction Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y border-b">
              {MOCK_ORDERS.map(order => (
                <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 flex items-center justify-center text-primary font-black text-xs">
                      {order.id.slice(-2)}
                    </div>
                    <div>
                      <p className="font-black text-[13px] uppercase tracking-tighter">{order.customerName}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{order.items.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[13px]">KES {order.total.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
