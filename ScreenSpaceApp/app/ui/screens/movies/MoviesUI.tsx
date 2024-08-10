import {Button, Center, ScrollView, Spinner, Text, VStack} from 'native-base';
import React, {useContext, useEffect} from 'react';
import CardMovie from '../../components/CardMovie';
import SearchBar from '../../components/SearchBar';
import ButtonPrimary from '../../components/ButtonPrimary';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import ky from 'ky';
import Config from 'react-native-config';
import HomeToolbarPublicUser from '../../components/HomeToolbarPublicUser';
import {UserContext} from '../../../UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from '../../styles/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<ParamListBase>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const LoadingScreen = () => {
  return (
    <Center>
      <Spinner accessibilityLabel="Loading" color="white" />
    </Center>
  );
};

const MoviesUI: React.FC<Props> = ({navigation}) => {
  //const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useContext(UserContext);
  const authToken = user.user?.tokens.accessToken;
  const [isLoading, setIsLoading] = React.useState(true);
  const [movieIdsThatHaveScreenings, setMovieIdsThatHaveScreenings] =
    React.useState<string[]>([]);
  const [moviesForm, setMoviesForm] = React.useState<
    {_id: string; name: string; age: string; rating: string; image: string}[]
  >([]);
  const [moviesData, setMoviesData] = React.useState([]);
  const route = useRoute();

  useEffect(() => {
    const fetchMovieIdsThatHaveScreenings = async () => {
      try {
        const response = await ky.get(`${Config.API_BASE_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const responseObject = await response.json();
        setMoviesData(responseObject);
        const movieIds = responseObject.map((movie: {_id: any}) => movie._id);
        const movieIdsWithScreenings = [];

        for (const movieId of movieIds) {
          const screeningsResponse = await ky.get(
            `${Config.API_BASE_URL}/movies/${movieId}/screenings`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          const screeningsData = await screeningsResponse.json();

          if (Array.isArray(screeningsData) && screeningsData.length > 0) {
            movieIdsWithScreenings.push(movieId);
          }
        }
        setMovieIdsThatHaveScreenings(movieIdsWithScreenings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error retrieving screenings:', error);
        setIsLoading(false);
      }
    };
    fetchMovieIdsThatHaveScreenings();
  }, []);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await ky.get(`${Config.API_BASE_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const movies = await response.json();
        const filteredMovies = [];
        for (const movieId of movieIdsThatHaveScreenings) {
          const movie = movies.find(
            (movie: {_id: string}) => movie._id === movieId,
          );
          if (movie) {
            filteredMovies.push(movie);
          }
        }
        setMoviesForm(filteredMovies);
      } catch (error) {
        console.error('error fetching movies data:', error);
      }
    };
    fetchMoviesData();
  }, [movieIdsThatHaveScreenings]);

  const renderMovies = () => {
    const elements = [];
    // Ordenar las películas por edad
    if (route.params === undefined) {
      for (let count = 0; count < moviesForm.length; count++) {
        const movie = moviesForm[count];
        elements.push(
          <Center marginBottom="4" key={movie._id}>
            <CardMovie
              movieID={movie._id}
              movieName={movie.name}
              movieAge={movie.age}
              movieRating={movie.rating}
              imageUrl={movie.image}
              onPress={() =>
                navigation.navigate('MovieDetails', {
                  movieId: movie._id,
                  movieName: movie.name,
                  movieRating: movie.rating,
                  movieImage: movie.image,
                })
              }
            />
          </Center>,
        );
      }
    } else {
      let sortedMovies;

      if (route.params.filtro === 'Nombre') {
        sortedMovies = moviesForm.sort((a, b) => a.name - b.name);
      }
      if (route.params.filtro === 'Edad') {
        sortedMovies = moviesForm.sort((a, b) => b.age - a.age);
      }
      if (route.params.filtro === 'Calificacion') {
        sortedMovies = moviesForm.sort((a, b) => b.rating - a.rating);
      }

      for (let count = 0; count < sortedMovies.length; count++) {
        const movie = sortedMovies[count];
        elements.push(
          <Center marginBottom="4" key={movie._id}>
            <CardMovie
              movieID={movie._id}
              movieName={movie.name}
              movieAge={movie.age}
              movieRating={movie.rating}
              imageUrl={movie.image}
              onPress={() =>
                navigation.navigate('MovieDetails', {
                  movieId: movie._id,
                  movieName: movie.name,
                  movieRating: movie.rating,
                  movieImage: movie.image,
                })
              }
            />
          </Center>,
        );
      }
    }
    return elements;
  };

  return (
    <VStack space={3} alignItems="center" height="100%">
      <Center display="flex" flexDirection="row">
        <Text>Near you</Text>
        <Button
          style={styles.toolbarButtonContainer}
          onPress={() => navigation.navigate('Filters')}
          variant="ghost"
          colorScheme="white"
          marginLeft="180">
          <Icon name="filter" size={20} color="white" />
        </Button>
      </Center>
      <Center>
        <ScrollView maxH="500">
          <VStack space={3} alignItems="center" height="100%">
            {isLoading ? <LoadingScreen /> : renderMovies()}
          </VStack>
        </ScrollView>
      </Center>
    </VStack>
  );
};

export default MoviesUI;
