import {Center, Image, ScrollView, VStack} from 'native-base';
import React, {useContext, useEffect} from 'react';
import HomeToolbarPrivateUser from '../../components/HomeToolbarPrivateUser';
import ButtonPrimary from '../../components/ButtonPrimary';
import CardScreeningPrivate from '../../components/CardScreeningPrivate';
import DropdownMenu from '../../components/DropdownMenu';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useRoute} from '@react-navigation/native';
import CardScreeningPublic from '../../components/CardScreeningPublic';
import ky from 'ky';
import Config from 'react-native-config';
import {UserContext} from '../../../UserContext';

type ScreenNavigationProp = NativeStackNavigationProp<ParamListBase>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function ListScreeningUIPublic({navigation}) {
  const route = useRoute();
  const user = useContext(UserContext);
  const movieID = route.params.movieId;
  const movieName = route.params.movieName;
  const [selectedCinema, setSelectedCinema] = React.useState('');
  const [cinemaOptions, setCinemaOptions] = React.useState(['']);
  const [cinemaIds, setCinemaIds] = React.useState([]);
  const [cinemaScreenings, setCinemaScreenings] = React.useState<
    {
      _id: any;
      cinemaName: string;
      cinemaId: string;
      auditoriumName: string;
      datetime: string;
      seats: any;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleCinemaChange = (value: any) => {
    setSearchQuery(value);
    console.log('Cinema id en listScreening: ' + value);
    setSelectedCinema(value);
    //traer funciones del cine
  };
  //{JSON.stringify(movieID)}
  useEffect(() => {
    const fetchCinemaScreenings = async () => {
      try {
        const authToken = user.user?.tokens.accessToken;
        const responseScreenings = await ky.get(
          `${Config.API_BASE_URL}/movies/${movieID}/screenings`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        const responseScreeningsObject = await responseScreenings.json();
        const elements = [];
        const cinemaNames = [];
        for (const screening of responseScreeningsObject) {
          const screeningId = screening._id;
          const screeningSeats = screening.seats;
          const screeningDatetime = screening.datetime;
          const screeningAuditoriumId = screening.auditoriumId;
          const screeningCinemaId = screening.cinemaId;
          console.log(
            'objeto armado ids: ',
            screeningDatetime,
            screeningCinemaId,
            screeningAuditoriumId,
          );
          const screeningAuditorium = await ky.get(
            `${Config.API_BASE_URL}/cinemas/auditoriums/${screeningAuditoriumId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          const screeningAuditoriumObject = await screeningAuditorium.json();
          const screeningAuditoriumName = screeningAuditoriumObject.name;
          console.log(screeningAuditoriumName);
          const screeningCinema = await ky.get(
            `${Config.API_BASE_URL}/cinemas/${screeningCinemaId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          const screeningCinemaObject = await screeningCinema.json();
          const screeningCinemaName = screeningCinemaObject.name;
          if (!cinemaNames.includes(screeningCinemaName)) {
            cinemaNames.push(screeningCinemaName);
          }
          elements.push({
            _id: screeningId,
            cinemaName: screeningCinemaName,
            cinemaId: screeningCinemaId,
            auditoriumName: screeningAuditoriumName,
            datetime: screeningDatetime,
            seats: screeningSeats,
          });
        }
        setCinemaOptions(cinemaNames);
        setCinemaScreenings(elements);
      } catch (error) {
        console.error('Error retrieving cinema screenings:', error);
      }
    };

    fetchCinemaScreenings();
  }, []);

  console.log('cinemaScreenings: ', cinemaScreenings);

  const renderData = (searchQuery?: string) => {
    if (searchQuery) {
      const filteredScreenings = cinemaScreenings.filter(
        screening => screening.cinemaName === searchQuery,
      );
      const elements = [];
      for (
        let count = 0;
        count < Object.keys(filteredScreenings).length;
        count++
      ) {
        //console.log(auditoriumsAmount);
        const screening = filteredScreenings[count];
        console.log('element filteredRenderData: ', screening);
        elements.push(
          <Center key={count}>
            <CardScreeningPublic
              cinema={screening.cinemaName}
              auditorium={screening.auditoriumName}
              date={screening.datetime}
              onPress={() =>
                navigation.navigate('BuyTickets', {
                  movieId: movieID,
                  movieName: movieName,
                  screeningId: screening._id,
                  seats: screening.seats,
                  auditoriumName: screening.auditoriumName,
                  datetime: screening.datetime,
                  cinemaName: screening.cinemaName,
                })
              }
            />
          </Center>,
        );
        return elements;
      }
    } else {
      const elements = [];
      console.log('cinemaScreeningslength: ', cinemaScreenings.length);
      for (
        let count = 0;
        count < Object.keys(cinemaScreenings).length;
        count++
      ) {
        //console.log(auditoriumsAmount);
        const screening = cinemaScreenings[count];
        console.log('element renderData: ', screening);
        elements.push(
          <Center key={count}>
            <CardScreeningPublic
              cinema={screening.cinemaName}
              auditorium={screening.auditoriumName}
              date={screening.datetime}
              onPress={() =>
                navigation.navigate('BuyTickets', {
                  movieId: movieID,
                  movieName: movieName,
                  screeningId: screening._id,
                  seats: screening.seats,
                  auditoriumName: screening.auditoriumName,
                  datetime: screening.datetime,
                  cinemaName: screening.cinemaName,
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
        <DropdownMenu
          purpose={'Cinema'}
          disabled={undefined}
          data={cinemaOptions}
          options={cinemaOptions}
          onChange={handleCinemaChange}
        />
      </Center>
      <Center>
        <ScrollView maxH="500">
          <VStack>
            {searchQuery ? renderData(searchQuery) : renderData()}
          </VStack>
        </ScrollView>
      </Center>
    </VStack>
  );
}
