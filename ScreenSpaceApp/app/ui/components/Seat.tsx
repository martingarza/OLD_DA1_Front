import React from 'react';
import {Box, Pressable, Text} from 'native-base';

const Seat = (props: {number: number}) => {
  const [selected, setSelected] = React.useState(false);
  const pressable = () => setSelected(previousState => !previousState);
  return (
    <Pressable onPress={pressable}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="36"
        h="37"
        borderTopWidth="2"
        borderBottomWidth="4"
        borderLeftWidth="3"
        borderRightWidth="3"
        borderColor="#F5C249"
        bg={selected === true ? '#C29427' : '#21242D'}
        borderTopRadius="4"
        borderBottomRadius="7">
        <Text
          color={selected === true ? 'black' : '#FFFFFF'}
          opacity={selected === true ? 1 : 0.3}>
          {' '}
          {props.number}{' '}
        </Text>
      </Box>
    </Pressable>
  );
};
export default Seat;
