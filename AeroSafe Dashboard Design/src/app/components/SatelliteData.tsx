import { Card } from './ui/card';
import { Satellite, Cloud, Zap, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SatelliteReading {
  id: string;
  name: string;
  coverage: number;
  lastUpdate: string;
  status: 'active' | 'standby';
}

const satellites: SatelliteReading[] = [
  { id: 'GOES-16', name: 'GOES-16 East', coverage: 98, lastUpdate: '2 min ago', status: 'active' },
  { id: 'GOES-17', name: 'GOES-17 West', coverage: 95, lastUpdate: '3 min ago', status: 'active' },
  { id: 'METEOSAT-11', name: 'Meteosat-11', coverage: 92, lastUpdate: '5 min ago', status: 'active' },
  { id: 'HIMAWARI-8', name: 'Himawari-8', coverage: 97, lastUpdate: '1 min ago', status: 'active' },
];

export function SatelliteData() {
  const [activeView, setActiveView] = useState<'infrared' | 'visible' | 'vapor' | 'lightning'>('infrared');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 h-full bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Satellite className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Satellite Data Visualization</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400">Live Feed</span>
        </div>
      </div>

      {/* Satellite View Selector */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <button
          onClick={() => setActiveView('infrared')}
          className={`p-2 rounded-lg border transition-all ${
            activeView === 'infrared'
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
        >
          <Eye className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">Infrared</div>
        </button>
        <button
          onClick={() => setActiveView('visible')}
          className={`p-2 rounded-lg border transition-all ${
            activeView === 'visible'
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
        >
          <Eye className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">Visible</div>
        </button>
        <button
          onClick={() => setActiveView('vapor')}
          className={`p-2 rounded-lg border transition-all ${
            activeView === 'vapor'
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
        >
          <Cloud className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">Water Vapor</div>
        </button>
        <button
          onClick={() => setActiveView('lightning')}
          className={`p-2 rounded-lg border transition-all ${
            activeView === 'lightning'
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
        >
          <Zap className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">Lightning</div>
        </button>
      </div>

      {/* Satellite View */}
      <div className="relative h-[300px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-lg border border-slate-700 overflow-hidden mb-4">
        {/* Earth visualization */}
        <div className="absolute inset-0">
          {activeView === 'infrared' && (
            <div className="relative w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-600/30 rounded-full blur-2xl"></div>
              <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-yellow-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-orange-600/25 rounded-full blur-2xl"></div>
            </div>
          )}
          {activeView === 'visible' && (
            <div className="relative w-full h-full">
              <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/3 w-48 h-32 bg-slate-300/15 rounded-full blur-2xl"></div>
            </div>
          )}
          {activeView === 'vapor' && (
            <div className="relative w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-44 h-44 bg-blue-500/25 rounded-full blur-2xl"></div>
            </div>
          )}
          {activeView === 'lightning' && (
            <div className="relative w-full h-full">
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          )}
        </div>

        {/* Scanning line */}
        <div 
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{ 
            top: `${scanProgress}%`,
            transition: 'top 0.1s linear'
          }}
        ></div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-cyan-400/50"></div>
            ))}
          </div>
        </div>

        {/* Info overlay */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded px-3 py-2 text-xs">
          <div className="text-slate-400">Current View:</div>
          <div className="text-white font-medium capitalize">{activeView}</div>
          <div className="text-slate-400 mt-1">Resolution: 2km</div>
        </div>

        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded px-3 py-2 text-xs">
          <div className="text-cyan-400 font-medium">Scanning: {scanProgress}%</div>
        </div>
      </div>

      {/* Satellite Status */}
      <div className="space-y-2">
        <h4 className="text-sm text-slate-400 mb-2">Active Satellites</h4>
        {satellites.map((sat) => (
          <div key={sat.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${sat.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span className="text-sm font-medium text-white">{sat.name}</span>
              </div>
              <span className="text-xs text-slate-400">{sat.lastUpdate}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 rounded-full transition-all"
                  style={{ width: `${sat.coverage}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-300">{sat.coverage}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
