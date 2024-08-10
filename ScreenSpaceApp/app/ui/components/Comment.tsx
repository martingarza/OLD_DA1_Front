import React from 'react';
import {Box, Image} from 'native-base';
import {Text, View} from 'react-native';
import {palette, styles} from '../styles/theme';
import {HStack, Pressable, Stack} from 'native-base';
import StarRating from 'react-native-star-rating-widget';

const Comment = (props: {
  userName: string;
  commentDate: string;
  commentContent: string;
  rate: any;
  imageUrl: string;
}) => {
  return (
    <View style={{margin: 0, borderRadius: 10}}>
      <Pressable
        onPress={() => {}}
        style={styles.commentCard}
        android_ripple={{color: palette.white, borderless: true}}>
        <HStack m={4} space={60} style={{display: 'flex', flex: 1}}>
          <Box display="flex" flexDirection="row" flex={0.8}>
            <Image
              style={styles.iconExtraSmallImage}
              source={{uri: props.imageUrl}}
              alt="popcorn.png"
            />
            <Box style={styles.auditoriumNameContainer}>
              <Text style={styles.labelText}>{props.userName}</Text>
            </Box>
          </Box>
          <Box style={styles.commentDateContainer}>
            <Text style={styles.labelText}>{props.commentDate}</Text>
          </Box>
        </HStack>
        <Stack m={4} space={30} style={{display: 'flex', flex: 3}}>
          <Text style={styles.commentText}>{props.commentContent}</Text>
        </Stack>
        <Stack>
          <StarRating
            rating={props.rate}
            style={{}}
            onChange={() => {}}
            starSize={20}
          />
        </Stack>
      </Pressable>
    </View>
  );
};

export default Comment;
