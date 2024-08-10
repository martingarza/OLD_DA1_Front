import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';

import {reactNavigationTheme} from '../ui/styles/theme';

import I18n from '../assets/localization/I18n';

import LoginScreen from '../ui/screens/Login/LoginScreen';
import LoginPrivateScreen from '../ui/screens/Login/LoginPrivate/LoginPrivateScreen';
import RecoverPasswordScreen from '../ui/screens/RecoverPassword/RecoverPasswordScreen';
import SignUpScreen from '../ui/screens/SignUp/SignUpScreen';
import EnterResetCodeScreen from '../ui/screens/RecoverPassword/EnterResetCodeScreen';
import EnterNewPasswordScreen from '../ui/screens/RecoverPassword/EnterNewPasswordScreen';
import Movies from '../ui/screens/Movies/Movies';
import {UserContext} from '../UserContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ConfirmDeleteProfileScreen from '../ui/screens/ConfirmDelete/ConfirmDeleteProfile/ConfirmDeleteProfileScreen';
import ProfilePrivateScreen from '../ui/screens/Profile/ProfilePrivate/ProfilePrivateScreen';
import CinemaList from '../ui/screens/CinemaList/CinemaList';
import AuditoriumList from '../ui/screens/AuditoriumList/AuditoriumList';
import CreateAuditorium from '../ui/screens/CreateAuditorium/CreateAuditorium';
import ConfirmDeleteAuditorium from '../ui/screens/ConfirmDelete/ConfirmDeleteAuditorium/ConfirmDeleteAuditorium';
import UpdateAuditorium from '../ui/screens/UpdateAuditorium/UpdateAuditorium';
import CreateCinema from '../ui/screens/CreateCinema/CreateCinema';
import ConfirmDeleteCinema from '../ui/screens/ConfirmDelete/ConfirmDeleteCinema/ConfirmDeleteCinema';
import UpdateCinema from '../ui/screens/UpdateCinema/UpdateCinema';
import PrivateMoviesListScreenUI from '../ui/screens/PrivateMoviesList/PrivateMoviesListScreenUI';
import CreateScreeningUI from '../ui/screens/CreateScreening/CreateScreeningUI';
import ListScreeningUIPrivate from '../ui/screens/ListScreeningPrivate/ListScreeningUIPrivate';
import ConfirmDeleteProfileScreenUI from '../ui/screens/ConfirmDelete/ConfirmDeleteProfile/ConfirmDeleteProfileScreenUI';
import ConfirmDeleteCinemaUI from '../ui/screens/ConfirmDelete/ConfirmDeleteCinema/ConfirmDeleteCinemaUI';
import CreateCinemaUI from '../ui/screens/CreateCinema/CreateCinemaUI';
import CinemaListUI from '../ui/screens/CinemaList/CinemaListUI';
import ProfilePrivateScreenUI from '../ui/screens/Profile/ProfilePrivate/ProfilePrivateScreenUI';
import ProfilePublicScreenUI from '../ui/screens/Profile/ProfilePublic/ProfilePublicScreenUI';
import UpdateCinemaUI from '../ui/screens/UpdateCinema/UpdateCinemaUI';
import PrivacyScreen from '../ui/screens/SignUp/PrivacyScreen';
import TermsScreen from '../ui/screens/SignUp/TermsScreen';
import CreateAuditoriumUI from '../ui/screens/CreateAuditorium/CreateAuditoriumUI';
import PurchaseHistoryScreenUI from '../ui/screens/PurchaseHistory/PurchaseHistoryScreenUI';
import UpdateAuditoriumUI from '../ui/screens/UpdateAuditorium/UpdateAuditoriumUI';
import ConfirmDeleteAuditoriumUI from '../ui/screens/ConfirmDelete/ConfirmDeleteAuditorium/ConfirmDeleteAuditoriumUI';
import AuditoriumListUI from '../ui/screens/AuditoriumList/AuditoriumListUI';
import Cinema from 'react-native-vector-icons/Feather';
import Screening from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from 'react-native-vector-icons/FontAwesome';
import MoviesUI from '../ui/screens/Movies/MoviesUI';
import FiltersScreenUI from '../ui/screens/Filters/FiltersScreenUI';
import MovieDetailsUI from '../ui/screens/MovieDetails/MovieDetailsUI';
import ListScreeningUIPublic from '../ui/screens/ListScreeningPublic/ListScreeningUIPublic';
import BuyTicketsUI from '../ui/screens/BuyTickets/BuyTicketsUI';
import SeatSelectionUI from '../ui/screens/SeatSelection/SeatSelectionUI';
import CheckoutUI from '../ui/screens/Chekout/CheckoutUI';
import PurchaseDetailsUI from '../ui/screens/PurchaseDetails/PurchaseDetailsUI';
import ProfileMapPublicScreen from '../ui/screens/Profile/ProfilePublic/ProfileMapPublicScreen';
import ConfirmDeleteScreeningScreen from '../ui/screens/ConfirmDelete/ConfirmDeleteScreening/ConfirmDeleteScreeningScreen';
import ConfirmDeleteScreeningScreenUI from '../ui/screens/ConfirmDelete/ConfirmDeleteScreening/ConfirmDeleteScreeningScreenUI';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  const {user} = useContext(UserContext);

  const screenOptions = {
    tabBarStyle: {
      backgroundColor: '#16171D',
      borderRadius: 50,
    },
    tabBarItemStyle: {
      backgroundColor: '#21242D',
      //borderRadius: 12,
    },
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function MoviesStack({navigation}) {
    return (
      <Stack.Navigator initialRouteName="MoviesList">
        <Stack.Screen
          name="MoviesList"
          component={PrivateMoviesListScreenUI}
          options={{
            headerTitle: I18n.t('movies'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ScreeningList"
          component={ListScreeningUIPrivate}
          options={{
            headerTitle: I18n.t('screenings'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ConfirmDeleteScreening"
          component={ConfirmDeleteScreeningScreenUI}
          options={{
            headerTitle: I18n.t('screenings'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateScreeningStack"
          component={CreateScreeningStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function CreateScreeningStack({navigation}) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CreateScreening"
          component={CreateScreeningUI}
          options={{
            headerTitle: I18n.t('createScreening'),
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function CinemasStack({navigation}) {
    return (
      <Stack.Navigator initialRouteName="CinemasList">
        <Stack.Screen
          name="CinemasList"
          component={CinemaListUI}
          options={{
            headerTitle: I18n.t('cinemas'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="UpdateCinema"
          component={UpdateCinemaUI}
          options={{
            headerTitle: I18n.t('updateCinema'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ConfirmDeleteCinema"
          component={ConfirmDeleteCinemaUI}
          options={{
            headerTitle: I18n.t('confirmDeleteCinema'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateCinema"
          component={CreateCinemaUI}
          options={{
            headerTitle: I18n.t('createCinema'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AuditoriumList"
          component={AuditoriumListUI}
          options={{
            headerTitle: I18n.t('auditoriums'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateAuditorium"
          component={CreateAuditoriumUI}
          options={{
            headerTitle: I18n.t('createAuditorium'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="UpdateAuditorium"
          component={UpdateAuditoriumUI}
          options={{
            headerTitle: I18n.t('updateAuditorium'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ConfirmDeleteAuditorium"
          component={ConfirmDeleteAuditoriumUI}
          options={{
            headerTitle: I18n.t('confirmDeleteAuditorium'),
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="AuditoriumsStack"
          component={AuditoriumsStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateCinemaStack"
          component={CreateCinemaStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function AuditoriumsStack({navigation}) {
    return (
      <Stack.Navigator initialRouteName="AuditoriumList">
        <Stack.Screen
          name="AuditoriumList"
          component={AuditoriumListUI}
          options={{
            headerTitle: I18n.t('auditoriums'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateAuditorium"
          component={CreateAuditoriumUI}
          options={{
            headerTitle: I18n.t('createAuditorium'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="UpdateAuditorium"
          component={UpdateAuditoriumUI}
          options={{
            headerTitle: I18n.t('updateAuditorium'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ConfirmDeleteAuditorium"
          component={ConfirmDeleteAuditoriumUI}
          options={{
            headerTitle: I18n.t('confirmDeleteAuditorium'),
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen name="CreateCinemaStack" component={CreateCinemaStack} />
      </Stack.Navigator>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function CreateCinemaStack({navigation}) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CreateCinema"
          component={CreateCinemaUI}
          options={{
            headerTitle: I18n.t('createCinema'),
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components

  // eslint-disable-next-line react/no-unstable-nested-components
  function ProfileStack({navigation}) {
    if (user.type === 'private') {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Profile"
            component={ProfilePrivateScreenUI}
            options={{
              headerTitle: I18n.t('profile'),
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ConfirmDelete"
            component={ConfirmDeleteProfileScreenUI}
            options={{
              headerTitle: I18n.t('confirmDeleteAccount'),
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Profile"
            component={ProfilePublicScreenUI}
            options={{
              headerTitle: I18n.t('profile'),
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ProfileMap"
            component={ProfileMapPublicScreen}
            options={{
              headerTitle: I18n.t('location'),
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ConfirmDelete"
            component={ConfirmDeleteProfileScreenUI}
            options={{
              headerTitle: I18n.t('confirmDeleteAccount'),
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Previous Purchase"
            component={PurchaseHistoryScreenUI}
            options={{
              headerTitle: 'Previous Purchase',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="PurchaseDetails"
            component={PurchaseDetailsUI}
            options={{
              headerTitle: I18n.t('purchaseDetails'),
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Terms"
            component={TermsScreen}
            options={{title: I18n.t('terms')}}
          />
          <Stack.Screen
            name="Privacy"
            component={PrivacyScreen}
            options={{title: I18n.t('privacy')}}
          />
        </Stack.Navigator>
      );
    }
  }

  function PublicMovieStack({navigation}) {
    return (
      <Stack.Navigator initialRouteName="PublicListMovies">
        <Stack.Screen
          name="PublicListMovies"
          component={MoviesUI}
          options={{
            headerTitle: I18n.t('movies'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Filters"
          component={FiltersScreenUI}
          options={{
            headerTitle: I18n.t('filters'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsUI}
          options={{
            headerTitle: I18n.t('movieDetails'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Showtimes"
          component={ListScreeningUIPublic}
          options={{
            headerTitle: I18n.t('showtimes'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BuyTickets"
          component={BuyTicketsUI}
          options={{
            headerTitle: I18n.t('chooseTickets'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="SeatSelection"
          component={SeatSelectionUI}
          options={{
            headerTitle: I18n.t('seatSelection'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutUI}
          options={{
            headerTitle: I18n.t('checkout'),
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer theme={reactNavigationTheme}>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: ''}}
          />
          <Stack.Group>
            <Stack.Screen
              name="LoginPrivate"
              component={LoginPrivateScreen}
              options={{title: I18n.t('loginAs') + ' ' + I18n.t('cinema')}}
            />
            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPasswordScreen}
              options={{title: I18n.t('forgotPassword')}}
            />
            <Stack.Screen
              name="EnterResetCode"
              component={EnterResetCodeScreen}
              options={{title: I18n.t('enterResetCode')}}
            />
            <Stack.Screen
              name="EnterNewPassword"
              component={EnterNewPasswordScreen}
              options={{title: I18n.t('enterNewPassword')}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{title: I18n.t('signUp')}}
            />
            <Stack.Screen
              name="Terms"
              component={TermsScreen}
              options={{title: I18n.t('terms')}}
            />
            <Stack.Screen
              name="Privacy"
              component={PrivacyScreen}
              options={{title: I18n.t('privacy')}}
            />
          </Stack.Group>
        </Stack.Navigator>
      ) : user.type === 'private' ? (
        <Tab.Navigator {...{screenOptions}}>
          <Stack.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({color = '', size = 0}) => (
                <Screening
                  name="movie-open-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
            name="MoviesStack"
            component={MoviesStack}
          />
          <Stack.Screen
            name="CinemasStack"
            component={CinemasStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color = '', size = 0}) => (
                <Cinema name="home" color={color} size={size} />
              ),
            }}
          />
          <Stack.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color = '', size = 0}) => (
                <Profile name="user-o" color={color} size={size} />
              ),
            }}
          />
          {/* <Stack.Screen
              options={{headerShown: false}}
              name="CreateScreening"
              component={CreateScreening}
            />
            <Stack.Screen
            name="UpdateAuditorium"
            component={UpdateAuditoriumScreen}
            options={{title: I18n.t('UpdateAuditorium')}}
          />
          <Stack.Screen
            name="UpdateCinema"
            component={UpdateCinemaScreen}
            options={{title: I18n.t('updateCinema')}}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ConfirmDeleteAccount"
            component={ConfirmDeleteAccountScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ConfirmDeleteAuditorium"
            component={ConfirmDeleteAuditoriumScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ConfirmDeleteCinema"
            component={ConfirmDeleteCinemaScreen}
          /> */}
        </Tab.Navigator>
      ) : (
        <Tab.Navigator {...{screenOptions}}>
          <Stack.Screen
            name="Movies"
            component={PublicMovieStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color = '', size = 0}) => (
                <Screening
                  name="movie-open-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color = '', size = 0}) => (
                <Profile name="user-o" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default RootNavigator;
