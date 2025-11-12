import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { CASA_LOCATIONS } from '../utils/constants';

type Ride = {
  id: number;
  from: any;
  to: any;
  distance: number;
  estimatedPrice: number;
  estimatedTime: number;
  isDayTime: boolean;
  status: string;
  startTime: string;
  driver: any;
};

interface TaxiState {
  screen: 'map' | 'booking' | 'ride' | 'history';
  isDayTime: boolean;
  userLocation: any;
  activeRide: Ride | null;
  rideHistory: Ride[];
  currentPrice: number;
  rideTimer: number;

  setScreen: (screen: TaxiState['screen']) => void;
  toggleDayTime: () => void;
  startRide: (from: any, to: any, distance: number, price: number, time: number) => void;
  updateRide: () => void;
  cancelRide: () => void;
  loadHistory: () => void;
  deleteRide: (id: number) => void;
}

export const useTaxiStore = create<TaxiState>((set, get) => ({
  screen: 'map',
  isDayTime: true,
  userLocation: CASA_LOCATIONS[3],
  activeRide: null,
  rideHistory: [],
  currentPrice: 0,
  rideTimer: 0,

  setScreen: (screen) => set({ screen }),
  toggleDayTime: () => set((s) => ({ isDayTime: !s.isDayTime })),

  startRide: (from, to, distance, price, estimatedTime) => {
    const ride: Ride = {
      id: Date.now(),
      from,
      to,
      distance,
      estimatedPrice: price,
      estimatedTime,
      isDayTime: get().isDayTime,
      status: 'enroute',
      startTime: new Date().toISOString(),
      driver: {
        name: ['Ahmed', 'Mohammed', 'Youssef', 'Karim'][Math.floor(Math.random() * 4)],
        rating: (4 + Math.random()).toFixed(1),
      },
    };
    set({ activeRide: ride, currentPrice: 7.5, rideTimer: 0, screen: 'ride' });
  },

  updateRide: () => {
    const { activeRide, rideTimer, currentPrice } = get();
    if (!activeRide) return;

    const newTimer = rideTimer + 1;
    const progress = newTimer / (activeRide.estimatedTime * 60);
    const newPrice = Math.min(currentPrice + 0.05, activeRide.estimatedPrice);

    if (progress >= 1) {
      set((state) => ({
        activeRide: { ...state.activeRide!, status: 'completed' },
        rideHistory: [state.activeRide!, ...state.rideHistory],
        screen: 'map',
        rideTimer: 0,
        currentPrice: 0
      }));
    } else {
      set({ rideTimer: newTimer, currentPrice: newPrice });
    }
  },

  cancelRide: () => set({ activeRide: null, screen: 'map' }),

  loadHistory: async () => {
    const saved = await AsyncStorage.getItem('rideHistory');
    if (saved) set({ rideHistory: JSON.parse(saved) });
  },

  deleteRide: async (id: number) => {
    const updated = get().rideHistory.filter((r) => r.id !== id);
    await AsyncStorage.setItem('rideHistory', JSON.stringify(updated));
    set({ rideHistory: updated });
  },
}));
