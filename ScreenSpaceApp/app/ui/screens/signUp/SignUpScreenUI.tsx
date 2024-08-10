//import { View } from 'react-native';
import React, {useState} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Center,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Text,
  VStack,
  useToast,
} from 'native-base';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import ky from 'ky';
import I18n from '../../../assets/localization/I18n';
import ButtonPrimary from '../../components/ButtonPrimary';
import ProfilePicture from '../../components/ProfilePicture';
import {Config} from 'react-native-config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUpScreenUI = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const [data, setData] = React.useState({
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isAccepted, setIsAccepted] = useState(false);
  const toggleSwitch = () => setIsAccepted(previousState => !previousState);
  const [errors, setErrors] = React.useState({});
  const [imageIsLoading, setImageIsLoading] = React.useState({});
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageFile, setImageFile] = React.useState<DocumentPickerResponse[]>(
    [],
  );

  //        ---= VALIDATION =---
  const validate = () => {
    setErrors({});

    // Terms
    if (!isAccepted) {
      setErrors(prevErrors => ({
        ...prevErrors,
        isAccepted: 'Terms not accepted',
      }));
      return false;
    }

    // Company
    if (data.company.length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        company: 'Company is required',
      }));
      return false;
    } else if (data.company.length < 3) {
      setErrors(prevErrors => ({
        ...prevErrors,
        company: 'Company is too short',
      }));
      return false;
    }

    // Email
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;

    if (data.email.length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Email is required',
      }));
      return false;
    } else if (!emailRegex.test(data.email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Email is not valid',
      }));
      return false;
    }

    return true;
  };

  //        ---= SUBMIT =---
  const onSubmit = () => {
    console.log('!! VALIDATING');
    if (validate()) {
      signUp();
    } else {
      console.log(errors);

      toast.show({
        description: Object.values(errors).join('\n'),
        title: 'Error',
        duration: 3000,
        placement: 'top',
      });
    }
  };

  const signUp = async () => {
    const response = await ky.post(`${Config.API_BASE_URL}/users`, {
      json: {
        avatar: imageUrl,
        fullname: '',
        company: data.company,
        address: '',
        email: data.email,
        password: data.password,
        refreshToken: '',
      },
    });
    console.log(response);
    navigation.goBack();
  };

  const selectFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      //console.log('res : ' + JSON.stringify(results));
      //handleUploadImage(results[0]);
      console.log(`!! FILE PRELOAD ${JSON.stringify(results)}`);
      setImageFile(results);
      //handleUploadImage(imageFile);
      handleUploadImage(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        setImageUrl('');
        setImageFile([]);
      } else {
        //For Unknown Error
        throw err;
      }
      /*       toast.show({
        description: JSON.stringify(err),
        title: 'Unknown Error',
        duration: 3000,
        placement: 'top',
      }); */
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
      data.email ? data.email.replace('@', '_at_') : image.name?.split('.')[0],
    );

    try {
      console.log(`!! SUBMITING TO ${Config.CLOUDINARY_URL} => ${formData}`);
      const response = await ky.post(`${Config.CLOUDINARY_URL}`, {
        body: formData,
      });
      const data = await response.json();
      console.log('!! UPLOAD success ', data);
      setImageUrl(data.url);
    } catch (error) {
      console.error('!! UPLOAD failed ', error);
    } finally {
      setImageIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <VStack
        space={4}
        alignItems="center"
        justifyContent="space-around"
        height="100%">
        <Center w="100%">
          <Flex direction="column">
            <Center pt="5%">
              <FormControl>
                <ProfilePicture
                  title={I18n.t('uploadPortraitPhoto')}
                  onPress={selectFile}
                  imgUrl={imageUrl}
                />
              </FormControl>
            </Center>
            <Center pt="10%">
              <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>
                  {I18n.t('company')}
                </FormControl.Label>
                <Input
                  size="md"
                  placeholder={I18n.t('enterCompany')}
                  onChangeText={value => setData({...data, company: value})}
                />
                <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                  Error Company
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>
                  {I18n.t('email')}
                </FormControl.Label>
                <Input
                  size="md"
                  keyboardType="email-address"
                  inputMode="email"
                  placeholder={I18n.t('enterEmail')}
                  onChangeText={value => setData({...data, email: value})}
                />
                <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                  Error Email
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>
                  {I18n.t('password')}
                </FormControl.Label>
                <Input
                  size="md"
                  placeholder={I18n.t('enterPassword')}
                  type="password"
                  onChangeText={value => setData({...data, password: value})}
                />
                <FormControl.HelperText _text={{fontSize: 'xs'}}>
                  {I18n.t('helpPassword')}
                </FormControl.HelperText>
                <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                  Error Password
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired pt="5%">
                <FormControl.Label _text={{bold: true}}>
                  {I18n.t('confirmPassword')}
                </FormControl.Label>
                <Input
                  size="md"
                  placeholder={I18n.t('enterPassword')}
                  type="password"
                  onChangeText={value =>
                    setData({...data, confirmPassword: value})
                  }
                />
                <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                  Error Password
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired pt="5%">
                <Checkbox
                  onChange={toggleSwitch}
                  accessibilityLabel="Accept terms of use & privacy policy"
                  value={'isAccepted'}>
                  <Text>{I18n.t('accept')}</Text>
                  <Text
                    color={'yellow.400'}
                    onPress={() => navigation.navigate('Terms')}>
                    {I18n.t('terms')}
                  </Text>
                  {'&  '}
                  <Text
                    color={'yellow.400'}
                    onPress={() => navigation.navigate('Privacy')}>
                    {I18n.t('privacy')}
                  </Text>
                </Checkbox>
              </FormControl>
            </Center>
          </Flex>
        </Center>
        <Center w="100%">
          <ButtonPrimary onPress={onSubmit} title={I18n.t('signUp')} />
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreenUI;
