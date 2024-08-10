import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {Box, Button, Center, Text, VStack} from 'native-base';
import React, {useContext, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SeatsLayout from '@mindinventory/react-native-bus-seat-layout';
import {styles} from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import Config from 'react-native-config';
import ky from 'ky';
import {UserContext} from '../../../UserContext';

export default function SeatSelectionUI() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const movieId = route.params.movieId;
  const movieName = route.params.movieName;
  const parcialPrice = route.params.parcialPrice;
  const tickets = route.params.tickets;
  const seats = route.params.seats;
  const datetime = route.params.datetime;
  const auditoriumName = route.params.auditoriumName;
  const screeningId = route.params.screeningId;
  const cinemaName = route.params.cinemaName;
  const user = useContext(UserContext);
  const occupiedSeatsList = [];
  console.log(user.user);
  seats.forEach(seat => {
    if (seat.isReserved == true) {
      const occupiedSeat = {seatNumber: seat.index, seatType: 'booked'};
      occupiedSeatsList.push(occupiedSeat);
    }
  });

  const bookingFee = 6;
  const totalPrice = parcialPrice + bookingFee;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seats: any) => {
    setSelectedSeats(seats);
  };

  return (
    <VStack>
      <VStack>
        <Center>
          <Box display="flex" alignItems="center">
            <Text style={styles.headerText}>{movieName}</Text>
            <Text style={styles.bodyText}>{datetime}</Text>
            <Text style={styles.bodyText}>{auditoriumName}</Text>
          </Box>
        </Center>
      </VStack>
      <VStack space={5} alignItems="center" maxHeight="75%" minHeight="75%">
        <Center
          maxW="100%"
          minW="100%"
          backgroundColor="#16171D"
          position="absolute"
          minH="60%"
          marginTop="3">
          <SeatsLayout
            maxSeatToSelect={tickets}
            row={9}
            layout={{columnOne: 0, columnTwo: 5}}
            selectedSeats={occupiedSeatsList}
            numberTextStyle={{fontSize: 13}}
            getBookedSeats={seats => {
              const numbers = seats.map(seat => seat.seatNo);
              handleSeatSelection(numbers);
            }}
          />
        </Center>
        <Center
          maxW="100%"
          minW="100%"
          backgroundColor="#16171D"
          position="absolute">
          <Box
            display="flex"
            alignItems="center"
            paddingTop="12"
            marginTop="10"
            borderTopWidth={1}
            borderTopColor="white"
            minW="80%"></Box>
        </Center>
        <Center position="absolute" marginTop="5">
          <Box>
            <Text>Screen</Text>
          </Box>
        </Center>
      </VStack>
      <Box display="flex" alignItems="center">
        <Text>Seats</Text>
      </Box>
      <Box>
        <ButtonPrimary
          onPress={() =>
            navigation.navigate('Checkout', {
              movieId: movieId,
              seats: selectedSeats,
              movieName: movieName,
              tickets: tickets,
              parcialPrice: parcialPrice,
              totalPrice: totalPrice,
              auditoriumName: auditoriumName,
              datetime: datetime,
              userId: user.user.id,
              screeningId: screeningId,
              cinemaName: cinemaName,
              token: user.user.tokens.accessToken,
            })
          }
          title="Checkout"
        />
      </Box>
    </VStack>
  );
}
