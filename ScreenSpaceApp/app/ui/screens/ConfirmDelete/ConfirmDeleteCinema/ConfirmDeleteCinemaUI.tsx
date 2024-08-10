import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {Center, VStack} from 'native-base';
import React, {useContext} from 'react';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonDanger from '../../../components/ButtonDanger';
import WarningMessage from '../../../components/WarningMessage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ky from 'ky';
import Config from 'react-native-config';
import {UserContext} from '../../../../UserContext';

export default function ConfirmDeleteCinemaUI() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const cinemaId = route.params.cinemaId;
  const user = useContext(UserContext);
  const authToken = user.user?.tokens.accessToken;

  const deleteCinema = async () => {
    try {
      const respuesta = await ky.delete(
        `${Config.API_BASE_URL}/cinemas/${cinemaId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      console.log(respuesta);
      navigation.replace('CinemasList');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <VStack>
      <Center w="100%" marginBottom="10" marginTop="10">
        <WarningMessage component="Cinema" />
      </Center>
      <Center w="100%" marginBottom="1">
        <ButtonDanger onPress={deleteCinema} title="Delete" />
      </Center>
      <Center w="100%">
        <ButtonPrimary
          onPress={() => navigation.replace('UpdateCinema', {id: cinemaId})}
          title="Cancel"
        />
      </Center>
    </VStack>
  );
}
