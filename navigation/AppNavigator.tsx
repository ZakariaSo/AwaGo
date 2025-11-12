import React from 'react';
import { BookingScreen } from '../screens/BookingScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { MapScreen } from '../screens/MapScreen';
import { RideScreen } from '../screens/RideScreen';
import { useTaxiStore } from '../store/taxiStore';

export const AppNavigator = () => {
  const { screen } = useTaxiStore();

  switch (screen) {
    case 'booking': return <BookingScreen />;
    case 'ride': return <RideScreen />;
    case 'history': return <HistoryScreen />;
    default: return <MapScreen />;
  }
};
