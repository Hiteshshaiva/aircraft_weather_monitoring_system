import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card } from './ui/card';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const turbulenceData = [
  { time: '00:00', severity: 2, altitude: 35000, forecast: 3 },
  { time: '03:00', severity: 3, altitude: 37000, forecast: 4 },
  { time: '06:00', severity: 5, altitude: 38000, forecast: 5 },
  { time: '09:00', severity: 4, altitude: 36000, forecast: 4 },
  { time: '12:00', severity: 6, altitude: 39000, forecast: 7 },
  { time: '15:00', severity: 7, altitude: 40000, forecast: 6 },
  { time: '18:00', severity: 4, altitude: 37000, forecast: 3 },
  { time: '21:00', severity: 3, altitude: 35000, forecast: 2 },
];

const altitudeRanges = [
  { altitude: '41,000 ft', turbulence: 35, status: 'Moderate' },
  { altitude: '39,000 ft', turbulence: 65, status: 'Severe' },
  { altitude: '37,000 ft', turbulence: 45, status: 'Moderate' },
  { altitude: '35,000 ft', turbulence: 25, status: 'Light' },
  { altitude: '33,000 ft', turbulence: 15, status: 'Light' },
];

export function TurbulencePrediction() {
  return (
    <Card className="p-4 h-full bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Turbulence Prediction & Analysis</h3>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors">
            24H Forecast
          </button>
          <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Real-Time
          </button>
        </div>
      </div>

      {/* Turbulence Timeline Chart */}
      <div className="mb-6">
        <h4 className="text-sm text-slate-400 mb-3">24-Hour Turbulence Forecast</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={turbulenceData}>
            <defs>
              <linearGradient id="severityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} label={{ value: 'Severity (0-10)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="severity" 
              stroke="#f59e0b" 
              strokeWidth={2}
              fill="url(#severityGradient)" 
              name="Current Severity"
            />
            <Area 
              type="monotone" 
              dataKey="forecast" 
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#forecastGradient)" 
              name="Forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Altitude-based Turbulence */}
      <div>
        <h4 className="text-sm text-slate-400 mb-3">Turbulence Intensity by Altitude</h4>
        <div className="space-y-2">
          {altitudeRanges.map((range, index) => (
            <div key={index} className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{range.altitude}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    range.status === 'Severe' ? 'bg-red-500/20 text-red-400' :
                    range.status === 'Moderate' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {range.status}
                  </span>
                  <span className="text-sm text-slate-300">{range.turbulence}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    range.status === 'Severe' ? 'bg-red-500' :
                    range.status === 'Moderate' ? 'bg-amber-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${range.turbulence}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Summary */}
      <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-amber-400">Turbulence Alert</div>
            <div className="text-xs text-slate-300 mt-1">
              Moderate to severe turbulence expected between 35,000-41,000 ft from 12:00-15:00 UTC. 
              Consider altitude adjustment or route modification.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
