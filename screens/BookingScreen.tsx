import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTaxiStore } from '../store/taxiStore';
import { colors } from '../styles/theme';
import { calculateDistance, calculatePrice } from '../utils/calculations';
import { CASA_LOCATIONS, TARIFS } from '../utils/constants';

export const BookingScreen = () => {
  const { setScreen, startRide, isDayTime } = useTaxiStore();
  const [from, setFrom] = useState(CASA_LOCATIONS[0]);
  const [to, setTo] = useState(CASA_LOCATIONS[1]);

  const handleConfirm = () => {
    const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
    const price = calculatePrice(distance, isDayTime, TARIFS);
    const time = Math.max(5, Math.floor(distance * 3)); 
    startRide(from, to, distance, price, time);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Réservation Taxi 🚕</Text>

      <Text>Départ :</Text>
      <Picker selectedValue={from.name} onValueChange={(v) => {
        const selectedLocation = CASA_LOCATIONS.find((l) => l.name === v);
        if (selectedLocation) setFrom(selectedLocation);
      }}>
        {CASA_LOCATIONS.map((loc) => (
          <Picker.Item key={loc.id} label={loc.name} value={loc.name} />
        ))}
      </Picker>
      <Picker selectedValue={to.name} onValueChange={(v) => {
        const selectedLocation = CASA_LOCATIONS.find((l) => l.name === v);
        if (selectedLocation) setTo(selectedLocation);
      }}>
      </Picker>
      <Text>Destination :</Text>

      <Text>Destination :</Text>
      <Picker selectedValue={to.name} onValueChange={(v) => setTo(CASA_LOCATIONS.find((l) => l.name === v) || to)}>
        {CASA_LOCATIONS.map((loc) => (
          <Picker.Item key={loc.id} label={loc.name} value={loc.name} />
        ))}
      </Picker>

      <TouchableOpacity
        onPress={handleConfirm}
        style={{
          backgroundColor: colors.primary,
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirmer la course</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setScreen('map')}
        style={{
          backgroundColor: '#f1f1f1',
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text>Retour à la carte</Text>
      </TouchableOpacity>
    </View>
  );
};
