import React from 'react';
import {HStack, VStack, Pressable} from 'native-base';
import {Box, Image} from 'native-base';
import {Text} from 'react-native';
import {styles} from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'native-base';
import I18n from '../../assets/localization/I18n';

const CardCinema = (props: {
  cinemaName: string | undefined;
  cinemaAuditoriumsAmount: any;
  onPressEdit: any;
  onPressCard: any;
}) => {
  return (
    <Pressable onPress={props.onPressCard} style={styles.cardAuditorium}>
      <HStack m={1} space={5} style={{display: 'flex'}}>
        <VStack p={1} space={10} style={{flex: 2}}>
          <Box display="flex" flexDirection="row">
            <Image
              style={styles.iconExtraSmallImage}
              source={require('../../assets/images/popcorn.png')}
              alt="popcorn.png"
            />
            <Box style={styles.auditoriumNameContainer}>
              <Text style={styles.bodyText}>{props.cinemaName}</Text>
            </Box>
          </Box>
          <Box>
            <Text style={styles.labelText}>
              {props.cinemaAuditoriumsAmount} {I18n.t('auditoriums')}
            </Text>
          </Box>
        </VStack>
        <VStack style={{flex: 0.5}}>
          <Button
            onPress={props.onPressEdit}
            variant="outline"
            colorScheme="white">
            <Icon name="pencil-outline" size={15} color="white" />
          </Button>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default CardCinema;
