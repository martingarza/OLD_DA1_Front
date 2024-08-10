import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PurchaseSummaryButton from '../../components/PurchaseSummaryButton';
import {UserContext} from '../../../UserContext';
import ky from 'ky';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PurchaseHistoryScreenUI = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useContext(UserContext);
  const [precio, setPrecio] = React.useState<string[]>([]);
  const [fecha, setFecha] = React.useState<string[]>([]);
  const [titulo, setTitulo] = React.useState<string[]>([]);
  const [imagen, setImagen] = React.useState<string[]>([]);
  const [asientos, setAsientos] = React.useState<string[]>([]);
  const [movideID, setMovideID] = React.useState<string[]>([]);
  const [purchaseid, setPurchaseID] = React.useState<string[]>([]);
  const [auditorio, setAuditorio] = React.useState<string[]>([]);
  const [cinema, setCinema] = React.useState<string[]>([]);
  const [ubicacion, setUbicacion] = React.useState<string[]>([]);

  const getPurchases = async () => {
    const authToken = user.user?.tokens.accessToken;
    const respuesta = await ky.get(`${Config.API_BASE_URL}/users/purchases`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseBody = await respuesta.json();

    const promises = responseBody.map(async elemento => {
      const nuevoAsiento = elemento.seats;
      setAsientos(prevAsiento => [...prevAsiento, nuevoAsiento]);

      const nuevoPrecio = elemento.totalPrice;
      setPrecio(prevPrecio => [...prevPrecio, nuevoPrecio]);

      const nuevoId = elemento._id;
      setPurchaseID(prevId => [...prevId, nuevoId]);

      const respuesta2 = await ky.get(
        `${Config.API_BASE_URL}/movies/screenings/${elemento.screeningId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const responseBody2 = await respuesta2.json();

      const nuevoMovieID = responseBody2.movieId;
      setMovideID(prevMovieId => [...prevMovieId, nuevoMovieID]);

      const nuevaFecha = responseBody2.datetime;
      setFecha(prevFecha => [...prevFecha, nuevaFecha]);

      const respuesta3 = await ky.get(
        `${Config.API_BASE_URL}/movies/${responseBody2.movieId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const responseBody3 = await respuesta3.json();

      const nuevoTitulo = responseBody3.name;
      setTitulo(prevTitulo => [...prevTitulo, nuevoTitulo]);

      const nuevaImagen = responseBody3.image;
      setImagen(prevImagen => [...prevImagen, nuevaImagen]);

      const respuesta4 = await ky.get(
        `${Config.API_BASE_URL}/cinemas/auditoriums/${responseBody2.auditoriumId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const responseBody4 = await respuesta4.json();

      const nuevoAuditorio = responseBody4.name;
      setAuditorio(prevAuditorio => [...prevAuditorio, nuevoAuditorio]);

      const respuesta5 = await ky.get(
        `${Config.API_BASE_URL}/cinemas/${responseBody4.cinemaId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const responseBody5 = await respuesta5.json();

      const nuevoCine = responseBody5.name;
      setCinema(prevCine => [...prevCine, nuevoCine]);

      const nuevaUbicacion = responseBody5.location;
      setUbicacion(prevUbicacion => [...prevUbicacion, nuevaUbicacion]);
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    getPurchases();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  });

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {fecha.map((elemento, index) => (
          <PurchaseSummaryButton
            key={index}
            movieTitle={titulo[index]}
            moviePrice={precio[index]}
            date={elemento}
            cinema={cinema[index]}
            imageUrl={imagen[index]}
            onPress={() =>
              navigation.navigate('PurchaseDetails', {
                movieTitle: titulo[index],
                moviePrice: precio[index],
                date: elemento,
                cinema: cinema[index],
                imageUrl: imagen[index],
                asientos: asientos[index],
                movideId: movideID[index],
                purchaseId: purchaseid[index],
                auditorio: auditorio[index],
                ubicacion: ubicacion[index],
                usuario: user.user.id,
              })
            }
          />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default PurchaseHistoryScreenUI;
