import {Box, Center, Image, ScrollView, Text, VStack} from 'native-base';
import React, {useContext, useEffect} from 'react';
import HomeToolbarPrivateUser from '../../components/HomeToolbarPrivateUser';
import ButtonPrimary from '../../components/ButtonPrimary';
import CardScreeningPrivate from '../../components/CardScreeningPrivate';
import DropdownMenu from '../../components/DropdownMenu';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useRoute} from '@react-navigation/native';
import ky from 'ky';
import {UserContext} from '../../../UserContext';
import {typesAreEqual} from 'react-native-document-picker/lib/typescript/fileTypes';
import Config from 'react-native-config';
import Comment from '../../components/Comment';
import StarRating from 'react-native-star-rating-widget';

type ScreenNavigationProp = NativeStackNavigationProp<ParamListBase>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function MovieDetailsUI({navigation}) {
  const route = useRoute();
  const movieId = route.params.movieId;
  const movieName = route.params.movieName;
  const movieImage = route.params.movieImage;
  const movieRating = route.params.movieRating;
  const user = useContext(UserContext);
  const [formData, setFormData] = React.useState<
    {comment: string; name: any; rate: string; imageUrl: string}[]
  >([]); //CAMBIAR ESTO
  const authToken = user.user?.tokens.accessToken;

  useEffect(() => {
    const fetchComments = async () => {
      const responseComments = await ky.get(
        `${Config.API_BASE_URL}/movies/${movieId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const responseCommentsObject = await responseComments.json();

      const dataPromises = responseCommentsObject.map(async comment => {
        const responseUser = await ky.get(
          `${Config.API_BASE_URL}/users/${comment.userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        const responseUserNombre = await responseUser.json();

        return {
          comment: comment.comment,
          name: responseUserNombre.fullname,
          rate: comment.rate,
          imageUrl: responseUserNombre.avatar,
        };
      });

      // Esperar a que todas las promesas se resuelvan
      const data = await Promise.all(dataPromises);
      setFormData(data);
    };

    fetchComments();
  }, []);

  const renderComments = () => {
    const elements = [];
    for (let count = 0; count < formData.length; count++) {
      const comment = formData[count];
      elements.push(
        <Center marginBottom="4" key={count}>
          <Comment
            userName={comment.name}
            commentContent={comment.comment}
            rate={comment.rate}
            imageUrl={comment.imageUrl}
          />
        </Center>,
      );
    }
    return elements;
  };

  return (
    <VStack space={4} alignItems="center" height="100%">
      <Center w="100%" borderRadius="12">
        <Image
          alt="ScreenSpace"
          borderRadius="12"
          source={{
            uri: movieImage,
          }}
          width={350}
          height={110}
        />
      </Center>
      <Center>
        <Box marginTop="2">
          <StarRating
            rating={movieRating}
            style={{}}
            onChange={() => {}}
            starSize={25}
          />
        </Box>
        <Box marginTop="2" marginLeft="3"></Box>
      </Center>
      <Center>
        <ScrollView maxH="350">
          <VStack space={2}>{renderComments()}</VStack>
        </ScrollView>
      </Center>
      <Center w="100%">
        <ButtonPrimary
          title="Showtimes"
          onPress={() =>
            navigation.navigate('Showtimes', {
              movieId: movieId,
              movieName: movieName,
            })
          }
        />
      </Center>
    </VStack>
  );
}
