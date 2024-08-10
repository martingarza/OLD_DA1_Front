import React from 'react';
import {Box, Image, Text} from 'native-base';
import {styles} from '../styles/theme';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Delete from 'react-native-vector-icons/Feather';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';

const InfoPurchase = (props: {
  movie: string;
  date: string;
  cinema: string;
  auditorium: string;
  location: string;
  tickets: any;
  seats: any;
  price: Float;
}) => {
  return (
    <Box alignItems="center" marginBottom={2}>
      <Box
        maxW="362"
        maxH="450"
        box-sizing="border-box"
        rounded="lg"
        overflow="hidden"
        _dark={{
          borderColor: '#21242D',
          backgroundColor: '#21242D',
        }}
        _web={{
          shadow: 0,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: '#21242D',
        }}>
        <Box
          display="flex"
          flexDirection="column"
          minW="367"
          minH="90"
          padding="2"
          backgroundColor="#21242D"
          justifyContent="center">
          <Box>
            <Text fontSize="26" fontStyle="bold">
              {props.movie}
            </Text>
            <Text>{props.date}</Text>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          minW="367"
          minH="130"
          padding="2"
          backgroundColor="#2D3038">
          <Box marginBottom="5" marginTop="3">
            <Text style={styles.bodyText}>
              {props.cinema} {props.location} - {props.auditorium}
            </Text>
          </Box>
          <Box marginBottom="10">
            <Text style={styles.bodyText}>{props.tickets} tickets</Text>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            minW="367"
            paddingRight="5"
            marginTop="7">
            <Box>
              <Text style={styles.bodyText}>Seats {props.seats}</Text>
            </Box>
            <Box>
              <Text style={styles.bodyText}>USD ${props.price}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoPurchase;
