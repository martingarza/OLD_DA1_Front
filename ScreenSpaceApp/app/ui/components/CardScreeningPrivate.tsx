import React from 'react';
import {Box, Image, Text} from 'native-base';
import {styles} from '../styles/theme';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Delete from 'react-native-vector-icons/Feather';

const CardScreeningPrivate = (props: {
  cinema: string;
  auditorium: string;
  date: string;
  onPress: any;
}) => {
  return (
    <Pressable>
      <Box alignItems="center" marginBottom={2}>
        <Box
          maxW="362"
          maxH="400"
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
            minH="120"
            padding="2">
            <Box
              display="flex"
              flexDirection="row"
              marginTop="2"
              justifyContent="space-between">
              <Box display="flex" flexDirection="row">
                <Icon name="building-o" size={25} color="#FFFFFF" />
                <Text
                  style={styles.labelText}
                  marginBottom="2"
                  marginLeft="2"
                  marginTop="2">
                  {props.cinema}
                </Text>
              </Box>
              <Box marginRight="5">
                <Pressable onPress={props.onPress}>
                  <Delete name="trash" size={25} color="#FFFFFF" />
                </Pressable>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" marginTop="2">
              <Image
                style={styles.iconExtraSmallImage}
                source={require('../../assets/images/popcorn.png')}
                alt="popcorn.png"
              />
              <Text
                style={styles.labelText}
                marginBottom="2"
                marginTop="2"
                marginLeft="2">
                {props.auditorium}
              </Text>
            </Box>
            <Box display="flex" flexDirection="row" marginTop="2">
              <Icon2 name="calendar" size={25} color="#FFFFFF" />
              <Text
                style={styles.labelText}
                marginBottom="2"
                marginTop="2"
                marginLeft="2">
                {props.date}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

export default CardScreeningPrivate;
