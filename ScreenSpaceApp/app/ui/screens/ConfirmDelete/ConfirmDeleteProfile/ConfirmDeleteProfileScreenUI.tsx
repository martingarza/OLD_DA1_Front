import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Center, Text, VStack} from 'native-base';
import React, {useContext} from 'react';
import {styles} from '../../../styles/theme';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonDanger from '../../../components/ButtonDanger';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserContext} from '../../../../UserContext';
import {Config} from 'react-native-config';
import ky from 'ky';

export default function ConfirmDeleteProfileScreenUI() {
  const {setUser} = useContext(UserContext);
  const user = useContext(UserContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const salir = async () => {
    const authToken = user.user?.tokens.accessToken;
    const respuesta = await ky.delete(`${Config.API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setUser(null);
  };
  return (
    <VStack>
      <Center w="100%" marginBottom="80" marginTop="20">
        <Text style={styles.headerText}>Are you sure?</Text>
      </Center>
      <Center w="100%" marginBottom="10" marginLeft="-1">
        <ButtonDanger onPress={salir} title="Delete" />
      </Center>
      <Center w="100%">
        <ButtonPrimary onPress={() => navigation.goBack()} title="Cancel" />
      </Center>
    </VStack>
  );
}
