import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {Box, Center, Text, VStack} from 'native-base';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ky from 'ky';
import InfoPurchase from '../../components/InfoPurchase';
import ButtonPrimary from '../../components/ButtonPrimary';
import DropdownMenu from '../../components/DropdownMenu';
import Config from 'react-native-config';

export default function CheckoutUI() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const movieName = route.params.movieName;
  const tickets = route.params.tickets;
  const parcialPrice = route.params.parcialPrice;
  const totalPrice = route.params.totalPrice;
  const seats = route.params.seats;
  const screeningId = route.params.screeningId;
  const userId = route.params.userId;
  const auditoriumName = route.params.auditoriumName;
  const datetime = route.params.datetime;
  const cinemaName = route.params.cinemaName;
  const token = route.params.token;
  const stringSeats = seats.join('-');

  const postData = async () => {
    const body = {
      userId: userId,
      screeningId: screeningId,
      seats: seats.toString(),
      totalPrice: parcialPrice + 6,
    };

    console.log(body);
    try {
      const response = await ky.post(`${Config.API_BASE_URL}/checkouts`, {
        json: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('POST request successful');
        // Puedes manejar la respuesta aquí si es necesario
      } else {
        console.log('POST request failed');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
    navigation.navigate('PublicListMovies');
  };

  return (
    <VStack>
      <Box>
        <InfoPurchase
          movie={movieName}
          date={datetime}
          cinema={cinemaName}
          auditorium={auditoriumName}
          tickets={tickets}
          seats={stringSeats}
          price={totalPrice}
          location={''}
        />
      </Box>
      <Box>
        <VStack maxW="90%" minW="90%" marginLeft="5" space={5} marginTop="10">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            minW="100%"
            maxW="100%"
            borderBottomWidth="1"
            borderBottomColor="white"
            paddingTop="3"
            paddingBottom="3">
            <Box>
              <Text>Subtotal</Text>
            </Box>
            <Box>
              <Text>{parcialPrice},00$</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            minW="100%"
            maxW="100%"
            borderBottomWidth="1"
            borderBottomColor="white"
            paddingTop="3"
            paddingBottom="3">
            <Box>
              <Text>Booking free</Text>
            </Box>
            <Box>
              <Text>6,00$</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            minW="100%"
            maxW="100%"
            borderBottomWidth="1"
            borderBottomColor="white"
            paddingTop="3"
            paddingBottom="3">
            <Box>
              <Text>Total price</Text>
            </Box>
            <Box>
              <Text>{totalPrice},00$</Text>
            </Box>
          </Box>
          <Box></Box>
          <Box>
            <ButtonPrimary onPress={() => postData()} title="Confirm" />
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}
