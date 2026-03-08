import { Card } from './ui/card';
import { Plane, TrendingUp, Activity, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const flightData = [
  { hour: '00:00', flights: 145, delays: 12 },
  { hour: '04:00', flights: 89, delays: 5 },
  { hour: '08:00', flights: 312, delays: 28 },
  { hour: '12:00', flights: 456, delays: 45 },
  { hour: '16:00', flights: 398, delays: 32 },
  { hour: '20:00', flights: 276, delays: 18 },
];

export function FlightStatus() {
  return (
    <Card className="p-4 h-full bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Active Flights Overview</h3>
        </div>
        <div className="text-xs text-slate-400">Last updated: Just now</div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Active</span>
          </div>
          <div className="text-2xl font-bold text-white">1,847</div>
          <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +12%
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400">Delayed</span>
          </div>
          <div className="text-2xl font-bold text-white">142</div>
          <div className="text-xs text-amber-400">7.7%</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs text-slate-400">On-Time</span>
          </div>
          <div className="text-2xl font-bold text-white">1,705</div>
          <div className="text-xs text-green-400">92.3%</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400">Diverted</span>
          </div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-xs text-red-400">Weather</div>
        </div>
      </div>

      {/* Flight Activity Chart */}
      <div>
        <h4 className="text-sm text-slate-400 mb-3">Flight Activity (24h)</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={flightData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="flights" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Flights" />
            <Bar dataKey="delays" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Delays" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Flight Updates */}
      <div className="mt-4">
        <h4 className="text-sm text-slate-400 mb-2">Recent Updates</h4>
        <div className="space-y-2">
          <div className="bg-slate-900/50 rounded p-2 border border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">AA2145 (JFK → LAX)</span>
              <span className="text-green-400">On-Time</span>
            </div>
            <div className="text-slate-400 mt-1">Cruising FL380 • ETA 14:32 UTC</div>
          </div>
          <div className="bg-slate-900/50 rounded p-2 border border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">UA1820 (ORD → DEN)</span>
              <span className="text-amber-400">Delayed +15min</span>
            </div>
            <div className="text-slate-400 mt-1">Weather hold • ETA 15:47 UTC</div>
          </div>
          <div className="bg-slate-900/50 rounded p-2 border border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">DL3456 (ATL → MIA)</span>
              <span className="text-green-400">On-Time</span>
            </div>
            <div className="text-slate-400 mt-1">Descending FL240 • ETA 16:15 UTC</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
