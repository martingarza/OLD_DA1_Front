import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Center, Image, Text, VStack} from 'native-base';
import I18n from '../../../assets/localization/I18n';
import ButtonPrimary from '../../components/ButtonPrimary';
import React, {useContext} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import ky from 'ky';
import {UserContext} from '../../../UserContext';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_ID,
});

const LoginScreenUI = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {setUser} = useContext(UserContext);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      /* const userInfo = {
        idToken:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFkZWRlZWUyZDE4NjliNjU3ZmE5MzAzMDAwODJmZTI2YjNkOTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0ODU4MjY4ODEyNDUtNnJpNmx2YmZxc2huYzl0M25tbDJ0djQ5YnJwYzkzZWQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0ODU4MjY4ODEyNDUtZ21wN2FtdjhybXRvdjNzM2UzaWlnY2JiZTBoNWduMGouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDAxNTI4NDIwNzkyMzE3MzI0OTIiLCJlbWFpbCI6InNicm9jY2FyZGlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJTZXJnaW8gQnJvY2NhcmRpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGRIU3FLX0lZcW9jWElOX0NBN2V6UVlpM1FXT2JCSDBreEtzLVRZSUYxMmFRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNlcmdpbyIsImZhbWlseV9uYW1lIjoiQnJvY2NhcmRpIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2ODg4NTM3MjYsImV4cCI6MTY4ODg1NzMyNn0.F-nYNde-rzjhOlB3VRds87G5yEcuvV1WINA3Haeyn1-eDqbiTZtusiaLkfb7om6eNsmLfya4msT4ALnFtV-zWj5vArNWgXcqI3PiHeMAB8bip_bSAIQqg3s0l7PzHllNxbL_TdAXf304d0dNqaouD5l6pkMizIRRivCfD9sTb9M9JZzUUvQEwmGiQBWSH4HV0nZcghNh8WY4YFRUprxKE87yJpVXCYy3ZGuAS0gQ5ouiUV9QA95EuWCQSP7aF-mYvkufPqUJXnXTfDEv7gsrYXEgJUKTVtzrwW--rKYfYVOiqZfNSKyMacs9wVyGN1S6AshmrjjN5wE3245J2IZF4A',
        scopes: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
        serverAuthCode: null,
        user: {
          email: 'sbroccardi@gmail.com',
          familyName: 'Broccardi',
          givenName: 'Sergio',
          id: '100152842079231732492',
          name: 'Sergio Broccardi',
          photo:
            'https://lh3.googleusercontent.com/a/AAcHTtdHSqK_IYqocXIN_CA7ezQYi3QWObBH0kxKs-TYIF12aQ=s96-c',
        },
      }; */
      // handle successful sign in
      const response = await ky.post(
        `${Config.API_BASE_URL}/auths/loginPublic`,
        {
          json: userInfo,
        },
      );
      console.log(response);
      const responseBody: User = await response.json();
      console.log(responseBody);

      setUser({
        tokens: responseBody.tokens,
        type: responseBody.type,
        avatar: responseBody.avatar,
        fullName: responseBody.fullName,
        id: responseBody.id,
        lat: responseBody.lat ?? -34.6037177671002,
        lng: responseBody.lng ?? -58.381571528206365,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.error(error);
      }
    }
  };

  return (
    <VStack
      space={4}
      alignItems="center"
      justifyContent="space-between"
      height="100%">
      <Center w={'100%'} pt={100}>
        <Image
          alt="ScreenSpace"
          source={require('../../../assets/images/popcorn.png')}
          width={188}
          height={188}
        />
      </Center>
      <Center w={'100%'}>
        <ButtonPrimary
          //onPress={() => navigation.navigate('LoginPublic')}
          onPress={googleSignIn}
          title={I18n.t('loginButton')}
          //isDisabled
        />
      </Center>
      <Center w={'100%'} pb={2}>
        <Text fontWeight={'normal'} color={'gray.400'}>
          {I18n.t('loginAs')}
          <Text
            color={'yellow.400'}
            onPress={() => navigation.navigate('LoginPrivate')}>
            {' '}
            {I18n.t('cinema')}
          </Text>
        </Text>
      </Center>
    </VStack>
  );
};

export default LoginScreenUI;
