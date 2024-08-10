import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {Center, VStack} from 'native-base';
import React, {useContext} from 'react';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonDanger from '../../../components/ButtonDanger';
import WarningMessage from '../../../components/WarningMessage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Config from 'react-native-config';
import ky from 'ky';
import {UserContext} from '../../../../UserContext';

type ScreenNavigationProp = NativeStackNavigationProp<ParamListBase>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function ConfirmDeleteScreeningScreenUI({navigation}) {
  const user = useContext(UserContext);
  const route = useRoute();
  const authToken = user.user?.tokens.accessToken;
  const movieName = route.params.movieName;
  const movieId = route.params.movieId;
  const screeningId = route.params.screeningId;
  const deleteScreening = async () => {
    try {
      const respuesta = await ky.delete(
        `${Config.API_BASE_URL}/movies/${movieId}/screenings/${screeningId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      console.log(respuesta);
      navigation.replace('MoviesList');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <VStack>
      <Center w="100%" marginBottom="10" marginTop="10">
        <WarningMessage component="Screening" />
      </Center>
      <Center w="100%" marginBottom="1" marginLeft="0">
        <ButtonDanger onPress={deleteScreening} title="Delete" />
      </Center>
      <Center w="100%">
        <ButtonPrimary onPress={() => navigation.goBack()} title="Cancel" />
      </Center>
    </VStack>
  );
}
