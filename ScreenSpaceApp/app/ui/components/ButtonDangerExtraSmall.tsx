import React from 'react';
import {Button} from 'native-base';

export default function ButtonDangerExtraSmall(props: {
  onPress: any;
  title?: string | undefined;
  size?: string | undefined;
  width?: string | undefined;
}) {
  const {onPress, title = '+', size = 'sm', width = '40px'} = props;
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
