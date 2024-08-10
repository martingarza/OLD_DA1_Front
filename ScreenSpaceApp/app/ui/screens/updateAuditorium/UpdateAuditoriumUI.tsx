import {
  Center,
  FormControl,
  Input,
  Image,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {View, Switch} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import I18n from '../../../assets/localization/I18n';
import ButtonDanger from '../../components/ButtonDanger';
import ButtonPrimary from '../../components/ButtonPrimary';
import {styles} from '../../styles/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ky from 'ky';
import Config from 'react-native-config';
import {UserContext} from '../../../UserContext';

const UpdateAuditoriumUI = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const route = useRoute();
  const [formData, setData] = React.useState({
    name: '',
    rows: '',
    seats: '',
    available: true,
  });
  const [switcher, toggleSwitch] = React.useState(true);
  const cinemaName = route.params.auditoriumNsame;
  const cinemaId = route.params.cinemaId;
  const auditoriumId = route.params.auditoriumId;
  const user = useContext(UserContext);

  const handleToggleSwitch = (value: any) => {
    toggleSwitch(value);
    setData({
      ...formData,
      available: value,
    });
  };

  useEffect(() => {
    const renderData = async () => {
      setData({
        ...formData,
        name: route.params.auditoriumName,
        rows: route.params.rows.toString(),
        seats: route.params.seats.toString(),
        available: route.params.available,
      });
    };
    renderData();
    /*const fetchAuditoriumData = async () => {
      console.log('Aud cinemaId ', cinemaId);
      console.log('Aud auditoriumId ', auditoriumId);
      const authToken = user.user?.tokens.accessToken;
      const respuesta = await ky.get(
        `${Config.API_BASE_URL}/cinemas/${cinemaId}/auditoriums/${auditoriumId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const responseBody = respuesta.json();
      console.log('responseBody UpdateAuditorium: ', responseBody);
      setData({
        ...formData,
        name: responseBody.name,
        rows: responseBody.rows,
        seats: responseBody.seatsPerRow,
        available: responseBody.available,
      });
    }; fetchAuditoriumData()*/
  }, []);

  const updateData = async () => {
    let data = {
      name: formData.name,
      rows: formData.rows,
      seats: formData.seats,
      available: formData.available,
    };
    try {
      const authToken = user.user?.tokens.accessToken;
      const respuesta = await ky.put(
        `${Config.API_BASE_URL}/cinemas/${cinemaId}/auditoriums/${auditoriumId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          json: data,
        },
      );
      navigation.replace('AuditoriumList', {
        cinemaName: cinemaName,
        cinemaId: cinemaId,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
              placeholder={route.params.auditoriumName}
              backgroundColor={'#21242D'}
              onChangeText={value => setData({...formData, name: value})}
            />
            {'\n'}
            {I18n.t('rows')}
            <Input
              size="md"
              keyboardType="email-address"
              inputMode="email"
              placeholder={route.params.rows.toString()}
              backgroundColor={'#21242D'}
              onChangeText={value => setData({...formData, rows: value})}
            />
            {'\n'}
            {I18n.t('seatsRows')}
            <Input
              size="md"
              keyboardType="email-address"
              inputMode="email"
              placeholder={route.params.seats.toString()}
              backgroundColor={'#21242D'}
              onChangeText={value => setData({...formData, seats: value})}
            />
          </FormControl>
        </Center>
        <View style={styles.switchcontainer}>
          <View
            style={{
              backgroundColor: '#21242D',
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderRadius: 8,
              flexDirection: 'row',
            }}>
            <Text>Available</Text>
            <Switch
              trackColor={{false: 'grey', true: '#f5dd4b'}}
              thumbColor={switcher ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleToggleSwitch}
              value={formData.available}
            />
          </View>
          <ButtonDanger
            onPress={() =>
              navigation.navigate('ConfirmDeleteAuditorium', {
                auditoriumId: auditoriumId,
                cinemaid: cinemaId,
              })
            }
            title={I18n.t('delete')}
            width="150px"
          />
        </View>
        <Center w="100%">
          <ButtonPrimary
            onPress={updateData}
            title={I18n.t('save')}
            width="90%"
          />
          <ButtonPrimary
            onPress={() =>
              navigation.replace('AuditoriumList', {
                cinemaId: cinemaId,
                cinemaName: cinemaName,
              })
            }
            title={I18n.t('cancel')}
            width="90%"
          />
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default UpdateAuditoriumUI;
