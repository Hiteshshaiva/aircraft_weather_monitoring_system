import { Card } from './ui/card';
import { AlertTriangle, AlertCircle, Info, Bell, CheckCircle } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  location: string;
  time: string;
  acknowledged: boolean;
}

const alerts: Alert[] = [
  {
    id: 'A001',
    type: 'critical',
    title: 'Severe Turbulence Alert',
    message: 'CAT forecast for FL390-FL410 over Denver area. Multiple pilot reports confirming severe conditions.',
    location: 'DEN Sector',
    time: '2 min ago',
    acknowledged: false,
  },
  {
    id: 'A002',
    type: 'critical',
    title: 'Thunderstorm Cell Detected',
    message: 'Rapidly developing CB with tops at FL450. Heavy precipitation and lightning activity.',
    location: 'ORD Sector',
    time: '5 min ago',
    acknowledged: false,
  },
  {
    id: 'A003',
    type: 'warning',
    title: 'Wind Shear Advisory',
    message: 'Low-level wind shear reported on final approach. Crosswind component 25 knots.',
    location: 'JFK Runway 31L',
    time: '8 min ago',
    acknowledged: false,
  },
  {
    id: 'A004',
    type: 'warning',
    title: 'Icing Conditions',
    message: 'Moderate icing reported between FL180-FL240. Recommend altitude change.',
    location: 'ATL Sector',
    time: '12 min ago',
    acknowledged: true,
  },
  {
    id: 'A005',
    type: 'info',
    title: 'METAR Update',
    message: 'Visibility improved to 10SM. Ceiling lifted to 3,500 ft broken.',
    location: 'LAX',
    time: '15 min ago',
    acknowledged: true,
  },
];

export function SafetyAlerts() {
  const criticalCount = alerts.filter(a => a.type === 'critical' && !a.acknowledged).length;
  const warningCount = alerts.filter(a => a.type === 'warning' && !a.acknowledged).length;

  return (
    <Card className="p-4 h-full bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Pilot Safety Alerts</h3>
        </div>
        <div className="flex gap-2">
          {criticalCount > 0 && (
            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
              {criticalCount} Critical
            </span>
          )}
          {warningCount > 0 && (
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-medium">
              {warningCount} Warning
            </span>
          )}
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-2xl font-bold text-red-400">{criticalCount}</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Critical Alerts</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <span className="text-2xl font-bold text-amber-400">{warningCount}</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Warnings</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-blue-400">
              {alerts.filter(a => a.type === 'info').length}
            </span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Info Updates</div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg p-4 border transition-all ${
              alert.acknowledged
                ? 'bg-slate-900/30 border-slate-800 opacity-60'
                : alert.type === 'critical'
                ? 'bg-red-500/10 border-red-500/30 animate-pulse-slow'
                : alert.type === 'warning'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-blue-500/10 border-blue-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {alert.type === 'critical' ? (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                ) : alert.type === 'warning' ? (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                ) : (
                  <Info className="w-5 h-5 text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h4
                    className={`font-semibold text-sm ${
                      alert.type === 'critical'
                        ? 'text-red-400'
                        : alert.type === 'warning'
                        ? 'text-amber-400'
                        : 'text-blue-400'
                    }`}
                  >
                    {alert.title}
                  </h4>
                  {alert.acknowledged && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <p className="text-sm text-slate-300 mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-medium">{alert.location}</span>
                    <span>•</span>
                    <span>{alert.time}</span>
                  </div>
                  {!alert.acknowledged && (
                    <button className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors">
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <div className="grid grid-cols-2 gap-2">
          <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm">
            Acknowledge All
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
            View History
          </button>
        </div>
      </div>
    </Card>
  );
}
