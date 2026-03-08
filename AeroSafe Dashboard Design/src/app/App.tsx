import { WeatherMap } from './components/WeatherMap';
import { TurbulencePrediction } from './components/TurbulencePrediction';
import { SatelliteData } from './components/SatelliteData';
import { SafetyAlerts } from './components/SafetyAlerts';
import { FlightStatus } from './components/FlightStatus';
import { Plane, Radio, Radar } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Radar className="w-10 h-10 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AeroSafe</h1>
                <p className="text-sm text-slate-400">Smart Aircraft Weather Monitoring & Prediction System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
                <Radio className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-xs text-slate-400">System Status</div>
                  <div className="text-sm font-medium text-green-400">All Systems Operational</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
                <Plane className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-400">Coverage</div>
                  <div className="text-sm font-medium text-white">Global</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-6">
        {/* Top Section - Weather Map and Flight Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <WeatherMap />
          </div>
          <div>
            <FlightStatus />
          </div>
        </div>

        {/* Middle Section - Turbulence and Satellite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TurbulencePrediction />
          <SatelliteData />
        </div>

        {/* Bottom Section - Safety Alerts */}
        <div className="grid grid-cols-1 gap-6">
          <SafetyAlerts />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm mt-8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div>© 2026 AeroSafe Systems. Real-time aviation weather intelligence.</div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Live Data Feed Active
              </span>
              <span>Last Update: {new Date().toLocaleTimeString()} UTC</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
