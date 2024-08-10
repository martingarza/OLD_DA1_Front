import {Center, FormControl, Input, VStack, useToast} from 'native-base';
import React, {useContext} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import I18n from '../../../../assets/localization/I18n';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ProfilePicture from '../../../components/ProfilePicture';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import ky from 'ky';
import {Config} from 'react-native-config';
import {styles} from '../../../styles/theme';
import {UserContext} from '../../../../UserContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonDanger from '../../../components/ButtonDanger';
import {RefreshControl} from 'react-native/Libraries/Components/RefreshControl/RefreshControl';
import ButtonLogout from '../../../components/ButtonLogout';

const ProfilePublicScreenUI = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const [formData, setData] = React.useState({
    username: '',
    img: ' ',
  });
  const [username, setUsername] = React.useState('');
  const [imageIsLoading, setImageIsLoading] = React.useState({});
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageFile, setImageFile] = React.useState<DocumentPickerResponse[]>(
    [],
  );

  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
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
      const response = await ky.post(`${Config.CLOUDINARY_URL}`, {
        body: formData,
      });
      const data = await response.json();
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
      username: responseBody.fullname,
      img: responseBody.avatar,
    });
  };
  const updateData = async () => {
    let data = {
      fullname: username,
    };
    if (username === '') {
      data = {
        fullname: formData.username,
      };
    }
    if (username !== '') {
      data = {
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
  if (formData.username === '') {
    getData();
  }
  const exit = () => {
    setUser(null);
  };

  return (
    <VStack
      space={1}
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
        </FormControl>
      </Center>
      <ButtonPrimary
        onPress={() => navigation.navigate('ProfileMap')}
        title={'Location'}
        width="90%"
      />
      <ButtonPrimary
        onPress={() => navigation.navigate('Previous Purchase')}
        title={'Previous Purchase'}
        width="90%"
      />
      <ButtonPrimary onPress={updateData} title={I18n.t('save')} width="90%" />
      <Center w={'50%'}>
        <View style={styles.buttonsContainer}>
          <ButtonDanger
            onPress={() => navigation.navigate('ConfirmDelete')}
            title={I18n.t('delete')}
            width="65%"
          />
          <ButtonLogout onPress={exit} title={I18n.t('logout')} />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{color: 'rgb(255, 255, 0)', marginRight: 10}}
            onPress={() => navigation.navigate('Terms')}>
            {I18n.t('terms')}
          </Text>
          <Text style={{color: 'rgb(255, 255, 0)'}}> {' & '} </Text>
          <Text
            style={{color: 'rgb(255, 255, 0)', marginLeft: 10}}
            onPress={() => navigation.navigate('Privacy')}>
            {I18n.t('privacy')}
          </Text>
        </View>
      </Center>
    </VStack>
  );
};

export default ProfilePublicScreenUI;
