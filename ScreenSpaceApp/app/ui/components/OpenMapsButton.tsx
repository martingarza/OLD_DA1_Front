import React from 'react';
import {Button, Linking} from 'react-native';

const OpenMapsButton = (props: {address: string}) => {
  const {address} = props;
  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    console.log(url);
    Linking.openURL(url);
  };

  return <Button title="Abrir Maps" onPress={openMaps} />;
};

export default OpenMapsButton;
