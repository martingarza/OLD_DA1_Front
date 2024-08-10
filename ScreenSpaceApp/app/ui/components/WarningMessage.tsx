import React from 'react';
import {Text} from 'react-native';
import {styles} from '../styles/theme';
import {Box} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

export default function WarningMessage(props: {component: string}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor="#21242D"
      padding="30"
      borderRadius="12">
      <Box marginBottom="20">
        <Icon name="warning" size={200} color="#F5C249" />
      </Box>
      <Box>
        <Text style={styles.labelText}>
          Are you sure you want to delete this {props.component}?
        </Text>
      </Box>
    </Box>
  );
}
