import React from 'react';
import {
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from 'native-base';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ButtonPrimary from '../../components/ButtonPrimary';
import I18n from '../../../assets/localization/I18n';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Config} from 'react-native-config';
import ky from 'ky';

const RecoverPasswordScreen = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const [formData, setData] = React.useState({email: ''});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    setErrors({});

    // Email
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;

    if (formData.email.length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Email is required',
      }));
      return false;
    } else if (!emailRegex.test(formData.email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Email is not valid',
      }));
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (validate()) {
      try {
        //TODO: Mover navigate al fondo.
        navigation.navigate('EnterResetCode', {
          params: {emailAddress: formData.email},
        });
        const respuesta = await ky
          .get(`${Config.API_BASE_URL}/users/resetpassword`, {
            searchParams: {
              email: formData.email,
            },
          })
          .json();
        console.log(respuesta);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(errors);

      toast.show({
        description: Object.values(errors).join('\n'),
        title: 'Error',
        duration: 3000,
        placement: 'top',
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <VStack
        space={4}
        alignItems="center"
        justifyContent="space-around"
        height="100%">
        <Center>
          <Heading size="xl" mb="4">
            {I18n.t('enterEmail')}
          </Heading>
        </Center>
        <Center w="90%">
          <FormControl isRequired>
            <FormControl.Label _text={{bold: true}}>
              {I18n.t('email')}
            </FormControl.Label>
            <Input
              size="md"
              placeholder={I18n.t('enterEmail')}
              onChangeText={value => setData({...formData, email: value})}
            />
            <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
              Error Email
            </FormControl.ErrorMessage>
          </FormControl>
        </Center>
        <Center w="100%">
          <ButtonPrimary onPress={onSubmit} title={I18n.t('sendEmail')} />
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default RecoverPasswordScreen;
