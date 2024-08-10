import React from 'react';
import {Button} from 'native-base';

export default function ButtonDanger(props: {
  onPress: any;
  title?: string | undefined;
  size?: string | undefined;
  width?: string | undefined;
}) {
  const {onPress, title = 'OK', size = 'lg', width = '200px'} = props;
  return (
    <Button
      colorScheme="danger"
      size={size}
      _text={{color: 'white', fontWeight: 'medium'}}
      onPress={onPress}
      w={width}>
      {title}
    </Button>
  );
}
