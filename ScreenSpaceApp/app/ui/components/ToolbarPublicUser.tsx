import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/theme';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ToolbarPublicUser(props: {
  onPress: any;
  title?: string | undefined;
}) {
  const {onPress, title = 'ToolbarTitle'} = props;

  return (
    <View style={styles.toolbarPublicUser}>
      <Button
        style={styles.toolbarButtonContainer}
        onPress={onPress}
        borderRadius="20"
        variant="ghost"
        colorScheme="white">
        <Icon name="arrowleft" size={20} color="white" />
      </Button>
      <Text style={styles.toolbarPublicUserText}>{title}</Text>
    </View>
  );
}
