import {
  Center,
  FormControl,
  Input,
  Image,
  VStack,
  useToast,
  Pressable,
  Icon,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import I18n from '../../../assets/localization/I18n';
import ButtonDanger from '../../components/ButtonDanger';
import ButtonPrimary from '../../components/ButtonPrimary';
import OpenMapsButton from '../../components/OpenMapsButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Linking} from 'react-native';
import ky from 'ky';
import Config from 'react-native-config';
import {UserContext} from '../../../UserContext';

const UpdateCinemaUI = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [formData, setData] = React.useState({name: '', address: ''});
  const route = useRoute();
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const cinemaId = route.params.cinemaId;
  const [cinemaData, setCinemaData] = React.useState({
    name: '',
    address: '',
  });

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    console.log(url);
    Linking.openURL(url);
  };
  const user = useContext(UserContext);

  const traerDatos = async () => {
    const authToken = user.user?.tokens.accessToken;
    const respuesta = await ky.get(
      `${Config.API_BASE_URL}/cinemas/${cinemaId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const responseBody = await respuesta.json();
    console.log(responseBody);
    setCinemaData({
      ...formData,
      name: responseBody.name,
      address: responseBody.location,
    });
  };

  const updatearDatos = async () => {
    let data = {
      name: name,
      location: address,
    };
    if (name === '' && address !== '') {
      data = {
        name: formData.name,
        location: address,
      };
    }
    if (name !== '' && address === '') {
      data = {
        name: name,
        location: formData.address,
      };
    }
    if (name !== '' && address !== '') {
      data = {
        name: name,
        location: address,
      };
    }
    const authToken = user.user?.tokens.accessToken;
    const respuesta = await ky.put(
      `${Config.API_BASE_URL}/cinemas/${cinemaId}`,
      {
        json: data,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    navigation.replace('CinemasList');
  };

  if (show == false) {
    traerDatos(), setShow(true);
  }
  return (
    <KeyboardAwareScrollView>
      <VStack
        space={4}
        alignItems="center"
        justifyContent="space-around"
        height="100%">
        <Center w="100%" pt={50}>
          <Image
            alt="ScreenSpace"
            source={require('../../../assets/images/popcorn.png')}
            width={116}
            height={116}
          />
        </Center>
        <Center w={'90%'}>
          <FormControl isRequired>
            {I18n.t('name')}
            <Input
              size="md"
              keyboardType="email-address"
              inputMode="email"
              placeholder={cinemaData.name}
              backgroundColor={'#21242D'}
              onChangeText={value => setName(value)}
            />
            {'\n'}
            {I18n.t('address')}
            <Input
              size="md"
              keyboardType="email-address"
              inputMode="email"
              placeholder={cinemaData.address}
              backgroundColor={'#21242D'}
              onChangeText={value => setAddress(value)}
              InputRightElement={
                <Pressable onPress={() => openMaps()}>
                  <Icon
                    as={<MaterialCommunityIcons name="google-maps" />}
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
          </FormControl>
        </Center>
        <Center w={'100%'}>
          <ButtonDanger
            onPress={() =>
              navigation.replace('ConfirmDeleteCinema', {cinemaId: cinemaId})
            }
            title={I18n.t('delete')}
            width="150px"
          />
        </Center>
        <Center w={'100%'}>
          <ButtonPrimary
            onPress={updatearDatos}
            title={I18n.t('save')}
            width="90%"
          />
        </Center>
        <Center w={'100%'}>
          <ButtonPrimary
            onPress={() => navigation.replace('CinemasList')}
            title={I18n.t('cancel')}
            width="90%"
          />
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default UpdateCinemaUI;
