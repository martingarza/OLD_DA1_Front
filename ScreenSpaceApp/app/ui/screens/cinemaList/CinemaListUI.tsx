import {ParamListBase, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ky from 'ky';
import {responseTypes} from 'ky/distribution/core/constants';
import {Center, ScrollView, Text, VStack} from 'native-base';
import React, {useContext, useEffect} from 'react';
import Config from 'react-native-config';
import I18n from '../../../assets/localization/I18n';
import {UserContext} from '../../../UserContext';
import ButtonPrimary from '../../components/ButtonPrimary';
import CardCinema from '../../components/CardCinema';
import {RefreshControl} from 'react-native';

type ScreenNavigationProp = NativeStackNavigationProp<ParamListBase>;

type Props = {
  navigation: ScreenNavigationProp;
};

const CinemaListUI: React.FC<Props> = ({navigation}) => {
  const [cinemasFlag, setCinemasFlag] = React.useState(0);
  const [formData, setData] = React.useState([
    {
      id: '',
      name: '',
      location: '',
      auditoriumsAmount: '',
    },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const user = useContext(UserContext);
  const getCinemas = async () => {
    setCinemasFlag(1); //este flag evita que la llamada se haga en loop
    try {
      const authToken = user.user?.tokens.accessToken;
      console.log('token: ', authToken);
      const userId = user.user?.id;
      console.log('UserId: ' + userId);
      const response = await ky.get(`${Config.API_BASE_URL}/cinemas`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const responseBody = await response.json();
      const cinemasData = responseBody
        .filter((document: {userId: any}) => document.userId == userId)
        .map(async (document: {_id: any; name: any; location: any}) => {
          console.log('cinemaId del map:' + document._id);
          const auditoriumsResponse = await ky.get(
            `${Config.API_BASE_URL}/cinemas/${document._id}/auditoriums`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          const auditoriumsData = await auditoriumsResponse.json();
          console.log('JSON auditorios de un cine:' + auditoriumsData);
          return {
            id: document._id,
            name: document.name,
            location: document.location,
            auditoriumsAmount: auditoriumsData.length,
          };
        });
      const cinemasDataWithAuditoriums = await Promise.all(cinemasData);
      setData(cinemasDataWithAuditoriums);
    } catch (err) {
      console.error('error: ', err);
    } finally {
      setRefreshing(false); // Finaliza el estado de actualización
    }
  };
  cinemasFlag == 0 ? getCinemas() : undefined;

  /*const getCinemaAuditoriumsAmount = async (cinemaId: any) => {
    try {
      const response = await ky.get(`http://192.168.1.82:3000/cinemas/${cinemaId}/auditoriums`);
      const responseBody = await response.json();
      return responseBody.length;
    }
    catch (err) {
      console.error('ERROR:',err);
    }
  };*/

  const renderCinemas = () => {
    const elements = [];
    for (let count = 0; count < formData.length; count++) {
      const cine = formData[count];
      //console.log(auditoriumsAmount);
      elements.push(
        <Center key={cine.id}>
          <CardCinema
            cinemaName={cine.name}
            cinemaAuditoriumsAmount={cine.auditoriumsAmount}
            onPressEdit={() =>
              navigation.replace('UpdateCinema', {cinemaId: cine.id})
            }
            onPressCard={() =>
              navigation.navigate('AuditoriumList', {
                cinemaName: cine.name,
                cinemaId: cine.id,
              })
            }
          />
        </Center>,
      );
    }
    return elements;
  };

  return (
    <VStack>
      <Center>
        <ScrollView
          maxH="600"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getCinemas} />
          }>
          <VStack space={4}>{renderCinemas()}</VStack>
        </ScrollView>
      </Center>
      <Center w={'100%'}>
        <ButtonPrimary
          onPress={() => navigation.replace('CreateCinemaStack')}
          title={I18n.t('createCinema')}
        />
      </Center>
    </VStack>
  );
};

export default CinemaListUI;
