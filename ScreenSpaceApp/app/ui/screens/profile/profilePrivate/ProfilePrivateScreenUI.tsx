import {Center, FormControl, Input, VStack, useToast} from 'native-base';
import React, {useContext} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import I18n from '../../../../assets/localization/I18n';
import ButtonLogout from '../../../components/ButtonLogout';
import ButtonDanger from '../../../components/ButtonDanger';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ProfilePicture from '../../../components/ProfilePicture';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import ky from 'ky';
import {styles} from '../../../styles/theme';
import {Config} from 'react-native-config';
import {UserContext} from '../../../../UserContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RefreshControl} from 'react-native';

const ProfilePrivateScreenUI = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const user = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [formData, setData] = React.useState({
    email: '',
    username: '',
    img: ' ',
  });
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [imageIsLoading, setImageIsLoading] = React.useState({});
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageFile, setImageFile] = React.useState<DocumentPickerResponse[]>(
    [],
  );

  const exit = () => {
    setUser(null);
  };

  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(`!! FILE PRELOAD ${JSON.stringify(results)}`);
      setImageFile(results);
      handleUploadImage(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setImageUrl('');
        setImageFile([]);
      } else {
        throw err;
      }
    }
  };

  const handleUploadImage = async (newImage: DocumentPickerResponse[]) => {
    let image = newImage[0];
    console.log('!! UPLOAD started ', image.uri);
    setImageIsLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.name,
    });
    formData.append('upload_preset', 'default-unsigned-preset');
    formData.append(
      'public_id',
      formData.email
        ? formData.email.replace('@', '_at_')
        : image.name?.split('.')[0],
    );

    try {
      console.log(`!! SUBMITING TO ${Config.CLOUDINARY_URL} => ${formData}`);
      const response = await ky.post(`${Config.CLOUDINARY_URL}`, {
        body: formData,
      });
      const data = await response.json();
      console.log('!! UPLOAD success ', data);
      setImageUrl(data.url);
      let data2 = {
        avatar: data.url,
      };
      const authToken = user.user?.tokens.accessToken;
      const respuesta = await ky.put(`${Config.API_BASE_URL}/users`, {
        json: data2,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      getData();
    } catch (error) {
      console.error('!! UPLOAD failed ', error);
    } finally {
      setImageIsLoading(false);
    }
  };

  const getData = async () => {
    const authToken = user.user?.tokens.accessToken;
    const respuesta = await ky.get(
      `${Config.API_BASE_URL}/users/${user.user?.id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const responseBody = await respuesta.json();
    setData({
      ...formData,
      email: responseBody.email,
      username: responseBody.fullname,
      img: responseBody.avatar,
    });
  };

  const updateData = async () => {
    let data = {
      email: email,
      fullname: username,
    };
    if (username === '' && email !== '') {
      data = {
        email: email,
        fullname: formData.username,
      };
    }
    if (username !== '' && email === '') {
      data = {
        email: formData.email,
        fullname: username,
      };
    }
    if (username !== '' && email !== '') {
      data = {
        email: email,
        fullname: username,
      };
    }
    const authToken = user.user?.tokens.accessToken;
    const respuesta = await ky.put(`${Config.API_BASE_URL}/users`, {
      json: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    getData();
  };

  if (formData.email === '') {
    getData();
  }

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getData} />
      }>
      <VStack
        space={8}
        alignItems="center"
        justifyContent="space-around"
        height="100%">
        <Text style={styles.headerText}> Avatar </Text>
        <ProfilePicture
          title={I18n.t('uploadPortraitPhoto')}
          onPress={selectFile}
          imgUrl={formData.img}
        />
        <Center w={'90%'}>
          <FormControl isRequired>
            {I18n.t('username')}
            {username === '' && (
              <Input
                size="md"
                keyboardType="email-address"
                inputMode="email"
                placeholder={formData.username}
                backgroundColor={'#21242D'}
                onChangeText={value => setUsername(value)}
              />
            )}
            {username !== '' && (
              <Input
                size="md"
                keyboardType="email-address"
                inputMode="email"
                placeholder={formData.username}
                backgroundColor={'#21242D'}
                onChangeText={value => setUsername(value)}
              />
            )}
            {'\n'}
            {I18n.t('emailAddress')}
            {email !== '' && (
              <Input
                size="md"
                keyboardType="email-address"
                inputMode="email"
                placeholder={formData.email}
                backgroundColor={'#21242D'}
                onChangeText={value => setEmail(value)}
              />
            )}
            {email === '' && (
              <Input
                size="md"
                keyboardType="email-address"
                inputMode="email"
                placeholder={formData.email}
                backgroundColor={'#21242D'}
                onChangeText={value => setEmail(value)}
              />
            )}
          </FormControl>
        </Center>
        <ButtonPrimary
          onPress={updateData}
          title={I18n.t('save')}
          width="90%"
        />
        <Center w={'50%'}>
          <View style={styles.buttonsContainer}>
            <ButtonDanger
              onPress={() => navigation.replace('ConfirmDelete')}
              title={I18n.t('delete')}
              width="65%"
            />
            <ButtonLogout onPress={exit} title={I18n.t('logout')} />
          </View>
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default ProfilePrivateScreenUI;
