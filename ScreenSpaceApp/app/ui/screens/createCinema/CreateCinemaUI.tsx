import {
  Center,
  FormControl,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React from 'react';
import I18n from '../../../assets/localization/I18n';
import ButtonPrimary from '../../components/ButtonPrimary';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import HomeToolbarPrivateUser from '../../components/HomeToolbarPrivateUser';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UserContext} from '../../../UserContext';
import {useContext} from 'react';
import ky from 'ky';
import Config from 'react-native-config';
import {Linking} from 'react-native';
export default function CreateCinemaUI() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const [formData, setData] = React.useState({name: '', location: ''});
  const [errors, setErrors] = React.useState({});
  const [address, setAddress] = React.useState('');
  const user = useContext(UserContext);
  const userId = user.user.id;

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    console.log(url);
    Linking.openURL(url);
  };

  const validate = () => {
    setErrors({});
    // Name
    if (formData.name.length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Name es required',
      }));
      return false;
    }
    // Location
    if (formData.location.length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        rows: 'Location is required',
      }));
      return false;
    }

    return true;
  };

  // El que toque esto el golpe mas tranquilo que se va a llevar es una patada a la cabeza.
  const crearCine = async (
    nombreCine: string,
    direccionCine: string,
    userId: string,
  ) => {
    // Realizar validación de los datos ingresados
    const datosValidos = validate();
    if (datosValidos) {
      try {
        // Realizar la solicitud POST al backend utilizando ky
        const authToken = user.user?.tokens.accessToken;
        const response = await ky.post(`${Config.API_BASE_URL}/cinemas`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          json: {
            userId: `${userId}`,
            name: `${nombreCine}`,
            location: `${direccionCine}`,
          },
        });
        const responseBody = await response.json();

        console.log('Cine creado:', responseBody);
        navigation.replace('CinemasList');
        // Realizar cualquier acción adicional después de crear el cine, como redireccionar a otra pantalla
      } catch (error) {
        console.error('Error al crear el cine:', error);
      }
    } else {
      console.log(errors);

      toast.show({
        description: Object.values(errors).join('\n'),
        title: 'Error',
        duration: 3000,
        placement: 'top',
      });
    }
  };

  const handleCrearCine = () => {
    crearCine(formData.name, formData.location, userId);
  };

  return (
    <KeyboardAwareScrollView>
      <VStack
        space={4}
        alignItems="center"
        justifyContent="space-around"
        height="100%">
        <Center />
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
            <FormControl.Label _text={{bold: true}}>
              {I18n.t('cinema')}
            </FormControl.Label>
            <Input
              size="md"
              keyboardType="default"
              inputMode="text"
              placeholder={I18n.t('enterNameCinema')}
              onChangeText={value => setData({...formData, name: value})}
            />
            <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
              Error Name
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired pt={5}>
            <FormControl.Label _text={{bold: true}}>
              {I18n.t('address')}
            </FormControl.Label>
            <Input
              size="md"
              placeholder={I18n.t('enterLocation')}
              type="text"
              keyboardType="default"
              onChangeText={value => setData({...formData, location: value})}
              InputRightElement={
                <Pressable marginRight="5" onPress={() => openMaps()}>
                  <Icon name="add-location-alt" size={15} color="#FFFFFF" />
                </Pressable>
              }
            />
            <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
              Error Address
            </FormControl.ErrorMessage>
          </FormControl>
        </Center>
        <Center w={'100%'}>
          <ButtonPrimary onPress={handleCrearCine} title={I18n.t('save')} />
        </Center>
        <Center w={'100%'}>
          <ButtonPrimary
            onPress={() => navigation.replace('CinemasList')}
            title={I18n.t('cancel')}
          />
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
