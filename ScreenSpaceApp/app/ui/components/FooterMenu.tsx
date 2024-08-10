import React from 'react';
import {Pressable, Text} from 'native-base';
import {NativeBaseProvider, Box, HStack, Center} from 'native-base';
import Cinema from 'react-native-vector-icons/Octicons';
import Screenings from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from 'react-native-vector-icons/Feather';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';

export default function FooterMenu(props: {selected: any}) {
  //const [selected, setSelected] = React.useState(1);
  const {selected} = props;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <NativeBaseProvider>
      <Box
        flex={1}
        bg="#21242D"
        safeAreaTop
        width="100%"
        maxW="350px"
        minW="350px"
        alignSelf="center"
        maxH="65px"
        borderRadius="12">
        <HStack
          bg="#21242D"
          alignItems="center"
          safeAreaBottom
          shadow={6}
          borderRadius="12">
          <Pressable
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => navigation.navigate('Login')}>
            <Center>
              <Cinema
                name="home"
                size={20}
                color={selected === 0 ? '#F5C249' : '#FFFFFF'}
              />
              <Text
                color={selected === 0 ? '#F5C249' : '#FFFFFF'}
                fontSize="12">
                Cinemas
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigation.navigate('Login')}>
            <Center>
              <Screenings
                name="movie"
                size={20}
                color={selected === 1 ? '#F5C249' : '#FFFFFF'}
              />
              <Text
                color={selected === 1 ? '#F5C249' : '#FFFFFF'}
                fontSize="12">
                Screenings
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={selected === 2 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => navigation.navigate('ProfilePrivate')}>
            <Center>
              <Profile
                name="user"
                size={20}
                color={selected === 2 ? '#F5C249' : '#FFFFFF'}
              />
              <Text
                color={selected === 2 ? '#F5C249' : '#FFFFFF'}
                fontSize="12">
                Profile
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
