import {Center, VStack} from 'native-base';
import React, {useState} from 'react';
import {View} from 'react-native';
import ButtonDanger from '../../components/ButtonDanger';
import ButtonPrimary from '../../components/ButtonPrimary';
import DropdownMenu from '../../components/DropdownMenu';
import {styles} from '../../styles/theme';
import I18n from '../../../assets/localization/I18n';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<ParamListBase>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const FiltersScreenUI: React.FC<Props> = ({navigation}) => {
  const filtros = ['Nombre', 'Edad', 'Calificacion'];
  const [SelectedFilter, setSelectedFilter] = React.useState(' ');
  const [SelectedMenu, setSelectedMenu] = React.useState(0);
  const [Values, setValues] = React.useState([' ']);
  const [Opcion, setOpcion] = React.useState('');

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <VStack
      space={4}
      alignItems="center"
      justifyContent="space-around"
      height="70%">
      <Center>
        <DropdownMenu
          data={filtros}
          purpose={'filter'}
          disabled={false}
          options={filtros}
          onChange={handleFilterChange}
          valueSelected={SelectedFilter}
        />
      </Center>

      <ButtonPrimary
        onPress={() =>
          navigation.navigate('PublicListMovies', {
            filtro: SelectedFilter,
          })
        }
        title={I18n.t('save')}
        width="35%"
      />
      <ButtonDanger
        onPress={() => navigation.navigate('PublicListMovies')}
        title={'Go Back'}
        width="35%"
      />
    </VStack>
  );
};

export default FiltersScreenUI;
