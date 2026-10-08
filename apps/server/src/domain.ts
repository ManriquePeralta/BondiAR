// Modelo de dominio compartido por todo el backend.
// El contrato HTTP (lo que ve la app) está en src/routes y se documenta en docs/API.md.

export type Mode = 'colectivo' | 'subte' | 'tren';

export interface LatLon {
  lat: number;
  lon: number;
}

export interface Stop extends LatLon {
  id: string;
  name: string;
  mode: Mode;
}

/** Un sentido de una línea: la secuencia ordenada de paradas y el trazado. */
export interface Pattern {
  id: string; // `${lineId}:${direction}`
  lineId: string;
  direction: 0 | 1;
  headsign: string; // "hacia Retiro"
  stopIds: string[];
  shape: LatLon[]; // polilínea por la que circula el vehículo
}

export interface Line {
  id: string;
  shortName: string; // "152", "A", "Sarmiento"
  longName: string;
  mode: Mode;
  color: string; // hex, color de la línea
  textColor: string;
  /** Frecuencia típica en minutos por sentido (para simular y para estimar si no hay datos en vivo). */
  headwayMinutes: number;
  /** Velocidad comercial típica en km/h. */
  speedKmh: number;
  patterns: Pattern[];
}

export interface VehiclePosition extends LatLon {
  vehicleId: string;
  lineId: string;
  direction: 0 | 1;
  /** Metros recorridos sobre el trazado del sentido (si el proveedor ya lo sabe). */
  distanceAlong?: number;
  speedKmh?: number;
  timestamp: number; // ms epoch
}

export interface Arrival {
  lineId: string;
  shortName: string;
  mode: Mode;
  color: string;
  textColor: string;
  direction: 0 | 1;
  headsign: string;
  stopId: string;
  vehicleId: string | null;
  etaSeconds: number;
  distanceMeters: number | null;
  stopsAway: number | null;
  /** true si sale de una posición GPS en vivo; false si es una estimación por frecuencia. */
  realtime: boolean;
}

export type AlertSeverity = 'info' | 'warning' | 'severe';

export interface ServiceAlert {
  id: string;
  lineIds: string[];
  mode: Mode;
  severity: AlertSeverity;
  title: string;
  description: string;
  startsAt: number;
  endsAt: number | null;
}
