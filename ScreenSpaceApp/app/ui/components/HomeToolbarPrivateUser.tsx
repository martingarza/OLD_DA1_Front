import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/theme';

export default function HomeToolbarPrivateUser(props: {
  title?: string | undefined;
}) {
  const {title = 'ToolbarTitle'} = props;

  return (
    <View style={styles.toolbarPrivateUser}>
      <Text style={styles.toolbarPrivateUserText}>{title}</Text>
    </View>
  );
}
