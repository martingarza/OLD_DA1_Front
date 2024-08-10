import {Center, VStack, Text, ScrollView} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import CardAuditorium from '../../components/CardAuditorium';
import ToolbarPrivateUser from '../../components/ToolbarPrivateUser';
import SearchBar from '../../components/SearchBar';
import ButtonPrimary from '../../components/ButtonPrimary';
import ky from 'ky';
import I18n from '../../../assets/localization/I18n';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Config from 'react-native-config';
import {UserContext} from '../../../UserContext';

export default function AuditoriumListUI() {
  const [auditoriumsData, setAuditoriumsData] = useState([
    {
      id: '',
      cinemaId: '',
      name: '',
      rows: 0,
      seatsPerRow: 0,
      available: true,
    },
  ]);

  const route = useRoute();
  const cinemaId = route.params.cinemaId;
  const cinemaName = route.params.cinemaName;
  const user = useContext(UserContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [flag, setFlag] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const getAuditoriums = async () => {
    setFlag(1);
    try {
      const authToken = user.user?.tokens.accessToken;
      //const cinemaId = user.user.id;
      const response = await ky.get(
        `${Config.API_BASE_URL}/cinemas/${cinemaId}/auditoriums`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const responseBody = await response.json();
      const auditoriumsData = responseBody
        .filter((document: {cinemaId: any}) => document.cinemaId == cinemaId)
        .map(
          (document: {
            _id: any;
            cinemaId: any;
            name: any;
            rows: any;
            seatsPerRow: any;
          }) => ({
            id: document._id,
            cinemaId: document.cinemaId,
            name: document.name,
            rows: document.rows,
            seatsPerRow: document.seatsPerRow,
          }),
        );
      setAuditoriumsData(auditoriumsData);
    } catch (err) {
      console.error('error: ', err);
    }
  };

  if (flag == 0) {
    getAuditoriums();
  }

  const renderAuditoriums = (searchQuery?: string) => {
    if (searchQuery) {
      const filteredAuditoriums = auditoriumsData.filter(auditorium =>
        auditorium.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      const elements = [];
      for (let count = 0; count < filteredAuditoriums.length; count++) {
        const auditorium = filteredAuditoriums[count];
        elements.push(
          <Center marginBottom="4" key={count}>
            <CardAuditorium
              auditoriumName={auditorium.name}
              auditoriumSize={`${auditorium.rows} rows of ${auditorium.seatsPerRow} seats`}
              auditoriumAvailability="Disponible"
              onPressCard={() =>
                navigation.replace('UpdateAuditorium', {
                  auditoriumName: auditorium.name,
                  rows: auditorium.rows,
                  seats: auditorium.seatsPerRow,
                  cinemaId: auditorium.cinemaId,
                  auditoriumId: auditorium.id,
                  available: auditorium.available,
                })
              }
            />
          </Center>,
        );
      }
      return elements;
    } else {
      const elements = [];
      for (let count = 0; count < auditoriumsData.length; count++) {
        const auditorium = auditoriumsData[count];
        elements.push(
          <Center marginBottom="4" key={count}>
            <CardAuditorium
              auditoriumName={auditorium.name}
              auditoriumSize={`${auditorium.rows} rows of ${auditorium.seatsPerRow} seats`}
              auditoriumAvailability="Disponible"
              onPressCard={() =>
                navigation.replace('UpdateAuditorium', {
                  auditoriumName: auditorium.name,
                  rows: auditorium.rows,
                  seats: auditorium.seatsPerRow,
                  cinemaId: auditorium.cinemaId,
                  auditoriumId: auditorium.id,
                  available: auditorium.available,
                })
              }
            />
          </Center>,
        );
      }
      return elements;
    }
  };

  return (
    <VStack space={4} alignItems="center" height="100%">
      <Center>
        <Text>{cinemaName}</Text>
      </Center>
      <Center>
        <SearchBar
          placeholder={I18n.t('search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={() => renderAuditoriums(searchQuery)}
        />
      </Center>
      <Center>
        <ScrollView maxH="450">
          <VStack space={10} alignItems="center" height="200%">
            <Center>{renderAuditoriums(searchQuery)}</Center>
          </VStack>
        </ScrollView>
      </Center>
      <Center width="100%">
        <ButtonPrimary
          title={I18n.t('createAuditorium')}
          onPress={() =>
            navigation.replace('CreateAuditorium', {
              cinemaId: cinemaId,
              cinemaName: cinemaName,
            })
          }
        />
      </Center>
    </VStack>
  );
}
