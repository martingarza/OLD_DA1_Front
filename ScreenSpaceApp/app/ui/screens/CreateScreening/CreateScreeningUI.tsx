import {Center, VStack, useToast} from 'native-base';
import React, {useContext, useEffect} from 'react';
import DropdownMenu from '../../components/DropdownMenu';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import ButtonPrimary from '../../components/ButtonPrimary';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {palette} from '../../styles/theme';
import I18n from '../../../assets/localization/I18n';
import ky from 'ky';
import {UserContext} from '../../../UserContext';
import Config from 'react-native-config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type ScreenNavigationProp = NativeStackNavigationProp<ParamListBase>;

type Props = {
  navigation: ScreenNavigationProp;
};

const CreateScreeningUI: React.FC<Props> = ({navigation}) => {
  /*TEMP*/
  const [movieOptions, setMovieOptions] = React.useState([]);
  const [auditoriumOptions, setAuditoriumOptions] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const toast = useToast();
  const user = useContext(UserContext);
  const [selectedDay, setSelectedDay] = React.useState('');
  const [selectedCinema, setSelectedCinema] = React.useState('');
  const [selectedAuditorium, setSelectedAuditorium] = React.useState('');
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [selectedSchedule, setSelectedSchedule] = React.useState('');
  const [cinemaOptions, setCinemaOptions] = React.useState(['']);
  const [cinemaIds, setCinemaIds] = React.useState([]);
  const [auditoriumIds, setAuditoriumIds] = React.useState([
    {
      _id: '',
    },
  ]);
  const [cinemasData, setCinemasData] = React.useState([
    {
      _id: '',
      name: '',
    },
  ]);
  const [moviesIds, setMoviesIds] = React.useState([
    {
      _id: '',
    },
  ]);
  const [moviesData, setMoviesData] = React.useState([
    {
      _id: '',
      name: '',
    },
  ]);
  const [schedule, setSchedule] = React.useState([
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '18:00',
    '20:00',
    '23:00',
    '01:00',
  ]);

  useEffect(() => {
    const fetchCinemaOptions = async () => {
      try {
        const authToken = user.user?.tokens.accessToken;
        const userId = user.user?.id;
        const response = await ky.get(`${Config.API_BASE_URL}/cinemas`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const responseObject = await response.json();
        const names = responseObject
          .filter((document: {userId: any}) => document.userId == userId)
          .map((cinema: any) => cinema.name);
        setCinemaOptions(names);

        const ids = responseObject
          .filter((document: {userId: any}) => document.userId == userId)
          .map((cinema: {_id: any}) => cinema._id);
        setCinemaIds(ids);

        const data = responseObject
          .filter((document: {userId: any}) => document.userId == userId)
          .map((cinema: {_id: any; name: any}) => ({
            _id: cinema._id,
            name: cinema.name,
          }));
        setCinemasData(data);
      } catch (error) {
        console.error('Error retrieving cinema options:', error);
      }
    };

    fetchCinemaOptions();

    const fetchMovieOptions = async () => {
      try {
        const authToken = user.user?.tokens.accessToken;
        const response = await ky.get(`${Config.API_BASE_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const responseObject = await response.json();
        const movieNames = responseObject.map((movie: any) => movie.name);
        setMovieOptions(movieNames);

        const moviesIds = responseObject.map((movie: any) => movie._id);
        setMoviesIds(moviesIds);

        const moviesData = responseObject.map(
          (movie: {_id: any; name: any}) => ({
            _id: movie._id,
            name: movie.name,
          }),
        );
        setMoviesData(moviesData);
      } catch (error) {
        console.error('Error retrieving movies:', error);
      }
    };

    fetchMovieOptions();
  }, []);

  const handleCinemaChange = async (value: any) => {
    console.log('cinemaId VALUE: ' + value);
    const selectedCinemaName = cinemasData.find(
      cinema => cinema._id === value,
    )?.name;
    console.log('selected cinema name: ' + selectedCinemaName);
    setSelectedCinema(value);
    setSelectedAuditorium(''); // Reseteamos el valor del siguiente dropdown
    setSelectedMovie(''); // Reseteamos el valor del siguiente dropdown
    try {
      const authToken = user.user?.tokens.accessToken;
      const response = await ky.get(
        `${Config.API_BASE_URL}/cinemas/${value}/auditoriums`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const responseObject = await response.json();
      //
      const auditoriumNames = responseObject
        .filter((document: {cinemaId: any}) => document.cinemaId == value)
        .map((auditorium: any) => auditorium.name);
      setAuditoriumOptions(auditoriumNames);
      //
      const auditoriumIds = responseObject
        .filter((document: {cinemaId: any}) => document.cinemaId == value)
        .map((auditorium: any) => auditorium._id);
      setAuditoriumIds(auditoriumIds);
    } catch (error) {
      console.error('Error retrieving auditoriums:', error);
    }
  };

  const handleAuditoriumChange = (value: any) => {
    setSelectedAuditorium(value);
    console.log('auditorium id value: ' + value);
    setSelectedMovie(''); // Reseteamos el valor del siguiente dropdown
  };

  const handleMovieChange = (value: any) => {
    setSelectedMovie(value);
    console.log('movie id value:' + value);
  };

  const handleScheduleChange = (value: any) => {
    setSelectedSchedule(value);
    console.log('schedule value: ' + value);
  };

  const validate = () => {
    setErrors({});
    // Name
    if (!selectedCinema) {
      setErrors(prevErrors => ({
        ...prevErrors,
        cinema: 'Cinema es required',
      }));
      return false;
    }
    //
    if (!selectedAuditorium) {
      setErrors(prevErrors => ({
        ...prevErrors,
        auditorium: 'Auditorium is required',
      }));
      return false;
    }
    //Movie
    if (!selectedMovie) {
      setErrors(prevErrors => ({
        ...prevErrors,
        movie: 'Movie is required',
      }));
      return false;
    }
    //Date
    if (!selectedDay) {
      setErrors(prevErrors => ({
        ...prevErrors,
        day: 'Day is required',
      }));
      return false;
    }
    if (!selectedSchedule) {
      setErrors(prevErrors => ({
        ...prevErrors,
        schedule: 'Schedule is required',
      }));
      return false;
    }
    return true;
  };

  const createScreening = async (
    auditoriumId: string,
    movieId: string,
    datetime: string,
    cinemaId: string,
  ) => {
    try {
      const authToken = user.user?.tokens.accessToken;
      const response = await ky.post(
        `${Config.API_BASE_URL}/movies/${movieId}/screenings`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          json: {
            movieId: `${movieId}`,
            auditoriumId: `${auditoriumId}`,
            cinemaId: `${cinemaId}`,
            datetime: `${datetime}`,
          },
        },
      );
      const responseBody = await response.json();
      console.log('Funcion creada:', responseBody);
      //getMovieName
      const selectedMovieName = moviesData.find(
        movie => movie._id == movieId,
      )?.name;
      navigation.replace('ScreeningList', {
        movieId: movieId,
        movieName: selectedMovieName,
      });
    } catch (error) {
      console.error('Error al crear la funcion:', error);
    }
  };

  const handleCreateScreening = async () => {
    if (validate()) {
      const datetime = selectedDay + ' ' + selectedSchedule;
      createScreening(
        selectedAuditorium,
        selectedMovie,
        datetime,
        selectedCinema,
      );
      toast.show({
        title: 'Funcion creada',
        duration: 3000,
        placement: 'top',
      });
    } else {
      toast.show({
        description: Object.values(errors).join('\n'),
        title: 'Error',
        duration: 3000,
        placement: 'top',
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <VStack space={3} alignItems="center">
        <Center>
          <DropdownMenu
            purpose={'cinema'}
            disabled={false}
            options={cinemaOptions}
            data={cinemaIds}
            onChange={handleCinemaChange}
            valueSelected={selectedCinema}
          />
        </Center>
        <Center>
          <DropdownMenu
            data={auditoriumIds}
            purpose={'auditorium'}
            disabled={!selectedCinema}
            options={auditoriumOptions}
            onChange={handleAuditoriumChange}
            valueSelected={selectedAuditorium}
          />
        </Center>
        <Center>
          <DropdownMenu
            data={moviesIds}
            purpose={'movie'}
            disabled={!selectedAuditorium}
            options={movieOptions}
            onChange={handleMovieChange}
          />
        </Center>
        <Center p="2">
          <Calendar
            style={{
              borderWidth: 1,
              borderRadius: 12,
              backgroundColor: palette.blackLight,
              borderColor: palette.blackLight,
              width: 362,
            }}
            theme={{
              textSectionTitleColor: palette.green,
            }}
            onDayPress={day => {
              setSelectedDay(day.dateString);
            }}
            markedDates={{
              [selectedDay]: {selected: true, disableTouchEvent: true},
            }}
            disabled={!selectedMovie}
          />
        </Center>
        <Center>
          <DropdownMenu
            data={schedule}
            purpose={'schedule'}
            disabled={!selectedDay}
            options={schedule}
            onChange={handleScheduleChange}
            valueSelected={selectedSchedule}
          />
        </Center>
        <Center p="2" />
        <Center width="100%">
          <ButtonPrimary
            title={I18n.t('createScreening')}
            onPress={handleCreateScreening}
          />
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default CreateScreeningUI;
/*const createScreening = async (cinema: string, auditorium: string, movieId: string, date: string) => { //Tenemos que sacar el id de la movie!
const datosValidos = validate();
if (datosValidos) {
try {
// Realizar la solicitud POST al backend utilizando ky
const response = await ky.post(`${Config.API_BASE_URL}/movies/${movieId}/screenings`, {
json: {

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
};
}; */
