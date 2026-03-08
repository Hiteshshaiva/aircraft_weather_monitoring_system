import { MapPin, CloudRain, Wind, Thermometer } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherStation {
  id: string;
  lat: number;
  lon: number;
  temp: number;
  condition: string;
  windSpeed: number;
}

const weatherStations: WeatherStation[] = [
  { id: 'JFK', lat: 40.6413, lon: -73.7781, temp: 18, condition: 'clear', windSpeed: 15 },
  { id: 'LAX', lat: 33.9416, lon: -118.4085, temp: 22, condition: 'cloudy', windSpeed: 10 },
  { id: 'ORD', lat: 41.9742, lon: -87.9073, temp: 12, condition: 'rain', windSpeed: 25 },
  { id: 'DFW', lat: 32.8998, lon: -97.0403, temp: 28, condition: 'clear', windSpeed: 18 },
  { id: 'DEN', lat: 39.8561, lon: -104.6737, temp: 8, condition: 'snow', windSpeed: 30 },
  { id: 'ATL', lat: 33.6407, lon: -84.4277, temp: 24, condition: 'cloudy', windSpeed: 12 },
];

export function WeatherMap() {
  return (
    <Card className="p-4 h-full bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Real-Time Weather Map</h3>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">NEXRAD Active</span>
          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">METAR Live</span>
        </div>
      </div>
      
      <div className="relative h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg border border-slate-700 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-slate-600/30"></div>
            ))}
          </div>
        </div>

        {/* Weather layer overlay */}
        <div className="absolute inset-0">
          {/* Rain system */}
          <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-40 bg-yellow-500/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Weather stations */}
        {weatherStations.map((station, index) => {
          const xPos = ((station.lon + 180) / 360) * 100;
          const yPos = ((90 - station.lat) / 180) * 100;
          
          return (
            <div
              key={station.id}
              className="absolute group cursor-pointer"
              style={{
                left: `${xPos}%`,
                top: `${yPos}%`,
                transform: 'translate(-50%, -50%)',
                animation: `pulse 2s ease-in-out infinite ${index * 0.2}s`,
              }}
            >
              <div className="relative">
                <MapPin className="w-6 h-6 text-cyan-400 drop-shadow-lg" fill="currentColor" />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 rounded px-2 py-1 whitespace-nowrap text-xs z-10">
                  <div className="text-white font-bold">{station.id}</div>
                  <div className="text-slate-300">{station.temp}°C</div>
                  <div className="text-slate-400">{station.windSpeed} kt</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Flight paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" opacity="0.6" />
            </marker>
          </defs>
          <path
            d="M 100 200 Q 300 150 500 250"
            stroke="#60a5fa"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.4"
            markerEnd="url(#arrowhead)"
          />
          <path
            d="M 200 350 Q 400 280 600 300"
            stroke="#60a5fa"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.4"
            markerEnd="url(#arrowhead)"
          />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500/40 rounded-full"></div>
              <span className="text-slate-300">Precipitation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500/40 rounded-full"></div>
              <span className="text-slate-300">Cloud Cover</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span className="text-slate-300">Weather Station</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather conditions summary */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-slate-400">Avg Temp</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">18.7°C</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Avg Wind</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">18 kt</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Precipitation</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">23%</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-xs text-slate-400">Stations</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">{weatherStations.length}</div>
        </div>
      </div>
    </Card>
  );
}
