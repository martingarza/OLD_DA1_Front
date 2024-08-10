import React, {useContext, useState} from 'react';
import {View, Text} from 'native-base';
import MapView, {
  Marker,
  Region,
  MapPressEvent,
  LatLng,
} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
import ButtonPrimary from './ButtonPrimary';
import {UserContext} from '../../UserContext';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

Geocoder.init(Config.GOOGLE_MAPS_API_KEY, {language: 'es'});

interface Props {
  latitude?: number;
  longitude?: number;
}

export default function Map(props: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {user, setUser} = useContext(UserContext);
  const {latitude = user?.lat, longitude = user?.lng} = props;
  console.log(user);
  const [region, setRegion] = useState<Region>({
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const onMapPress = async (e: MapPressEvent) => {
    const latLng = e.nativeEvent.coordinate;
    setMarker(latLng);

    // Obtener la dirección a partir de las coordenadas
    const response = await Geocoder.from(latLng.latitude, latLng.longitude);
    setAddress(response.results[0].formatted_address);
  };

  const onConfirmPress = async () => {
    if (marker) {
      setUser(prevUser => {
        prevUser.lat = marker.latitude;
        prevUser.lng = marker.longitude;
        return prevUser;
      });
    }
    console.log(user);
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} initialRegion={region} onPress={onMapPress}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
      {address && (
        <>
          <Text style={{padding: 10}}>
            {/* Coordenadas: {marker?.latitude}, {marker?.longitude} {'\n'} */}
            {address}
          </Text>
          <ButtonPrimary onPress={onConfirmPress} />
        </>
      )}
    </View>
  );
}
