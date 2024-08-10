import React from 'react';
import {Box, Button, HStack, Image, Pressable, VStack} from 'native-base';
import {Text} from 'react-native';
import {palette, styles} from '../styles/theme';

const CardAuditorium = (props: {
  auditoriumName: string | undefined;
  auditoriumSize: string | undefined;
  auditoriumAvailability: string | undefined;
  onPressCard: any;
}) => {
  const {
    auditoriumName = 'undefined',
    auditoriumSize = 'undefined',
    auditoriumAvailability = 'undefined',
  } = props;
  return (
    <Pressable onPress={props.onPressCard} style={styles.cardAuditorium}>
      <HStack m={1} space={10} style={{display: 'flex'}}>
        <VStack p={1} space={6} style={{flex: 1}} maxH="100%">
          <Box display="flex" flexDirection="row" flex={0}>
            <Image
              style={styles.iconExtraSmallImage}
              source={require('../../assets/images/popcorn.png')}
              alt="popcorn.png"
            />
            <Box style={styles.auditoriumNameContainer}>
              <Text style={styles.bodyText}>{auditoriumName}</Text>
            </Box>
          </Box>
          <Box flex={0} style={styles.auditoriumSizeContainer}>
            <Text style={styles.bodyText}>{auditoriumSize}</Text>
          </Box>
        </VStack>
        <VStack pl={1} style={{flex: 0.6}}>
          <Button disabled variant="outline" color={palette.white}>
            {auditoriumAvailability}
          </Button>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default CardAuditorium;
