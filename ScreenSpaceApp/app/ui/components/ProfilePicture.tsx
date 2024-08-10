import React from 'react';
import {Center, Image, Pressable, Text} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {palette} from '../styles/theme';

export default function ProfilePicture(props: {
  onPress: any;
  title?: string | undefined;
  imgUrl?: string | undefined;
}) {
  const {onPress, title = 'Upload portrait photo', imgUrl} = props;
  return (
    <Center>
      <Pressable onPress={onPress} bg="gray.800" p="2" rounded="lg" w={'50%'}>
        <Center>
          {!imgUrl ? (
            <>
              <Icon name="user" size={50} color={palette.grey} />
              <Text fontSize="xs" color={'gray.400'} pt={'5%'}>
                {title}
              </Text>
            </>
          ) : (
            <Image
              size={100}
              borderRadius={50}
              source={{
                uri: imgUrl,
              }}
              alt={imgUrl}
            />
          )}
        </Center>
      </Pressable>
    </Center>
  );
}
