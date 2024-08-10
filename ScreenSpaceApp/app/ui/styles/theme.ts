import {Center, extendTheme} from 'native-base';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import {StyleSheet} from 'react-native';

export const palette = {
  yellow: '#F5C249',
  red: '#FF403B',
  green: '#00C566',
  black: '#16171D',
  blackLight: '#21242D',
  grey: '#494D58',
  white: '#F0F2F3',
};

export const nativeBaseTheme = extendTheme({
  colors: {
    singletons: {
      white: 'F0F2F3',
      black: '16171D',
    },
    primary: {
      50: '#fff5dc',
      100: '#ffe9b5',
      200: '#fddc8f',
      300: '#f7ce6d',
      400: '#f5c249',
      500: '#eeb737',
      600: '#e5ac29',
      700: '#d39e22',
      800: '#b88c26',
      900: '#9f7b28',
    },
    danger: {
      50: '#ffdddc',
      100: '#ffb7b5',
      200: '#ff918d',
      300: '#ff6a65',
      400: '#ff403b',
      500: '#f8332c',
      600: '#f1241d',
      700: '#df1d16',
      800: '#c3201b',
      900: '#a9221e',
    },
    success: {
      50: '#67ffb6',
      100: '#3fffa2',
      200: '#17ff8f',
      300: '#00ef7b',
      400: '#00c566',
      500: '#05aa5a',
      600: '#098f4e',
      700: '#0c7542',
      800: '#0d5c36',
      900: '#0c452a',
    },
  },
  fonts: {
    heading: 'Poppins-SemiBold',
    body: 'Poppins-Medium',
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

export const reactNavigationTheme = {
  // COLORS
  dark: true,
  colors: {
    primary: palette.yellow,
    background: palette.black,
    card: palette.black,
    text: palette.white,
    border: palette.black,
    notification: palette.black,
    foreground: palette.white,
    success: palette.yellow,
    danger: palette.red,
    failure: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
};

export const styles = StyleSheet.create({
  // --- TEXT ---
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: '600',
    color: palette.white,
  },
  labelText: {
    fontFamily: 'Poppins-Medium',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: '500',
    color: palette.white,
  },
  buttonPrimaryText: {
    fontFamily: 'Poppins-Medium',
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: '500',
    color: palette.black,
  },
  bodyText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight: '400',
    color: palette.white,
  },
  commentText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 13,
    fontWeight: '400',
    color: palette.white,
  },
  signupText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: '400',
    color: palette.grey,
  },
  signupLinkText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: '400',
    color: palette.yellow,
  },
  toolbarPublicUserText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 19,
    fontWeight: '600',
    color: palette.white,
    flex: 1,
    paddingHorizontal: 80,
    paddingTop: 9,
    justifyContent: 'center',
  },
  toolbarPrivateUserText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 19,
    fontWeight: '600',
    color: palette.white,
    flex: 1,
    paddingHorizontal: 80,
    paddingTop: 9,
    justifyContent: 'center',
  },
  // --- COMPONENTS ---
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: palette.black,
  },
  auditoriumSizeContainer: {
    paddingLeft: 0,
  },
  commentDateContainer: {
    paddingLeft: 0,
    flex: 0.5,
  },
  ratingContainer: {},
  auditoriumNameContainer: {
    paddingLeft: 10,
  },
  cardAuditorium: {
    //CAMBIAR ESTO SEGUN CONVENGA
    width: 367,
    height: 120,
    padding: 10,
    backgroundColor: palette.blackLight,
    borderRadius: 30,
    justifyContent: 'flex-start',
  },
  commentContentContainer: {
    flex: 0.5,
  },
  commentCard: {
    //CAMBIAR ESTO SEGUN CONVENGA
    width: 367,
    height: 171,
    padding: 5,
    backgroundColor: palette.blackLight,
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
  },
  /*TEMP*/ cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  iconBigImage: {
    width: 188,
    height: 188,
  },
  iconMediumImage: {
    width: 116,
    height: 116,
  },
  iconSmallImage: {
    width: 70,
    height: 70,
  },
  iconExtraSmallImage: {
    width: 23,
    height: 23,
  },
  buttonPrimary: {
    backgroundColor: palette.yellow,
    width: 300,
    height: 53,
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  buttonDanger: {
    backgroundColor: palette.red,
    width: 300,
    height: 53,
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  buttonDangerMed: {
    backgroundColor: palette.red,
    width: 170,
    height: 53,
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  buttonDangerSmall: {
    backgroundColor: palette.red,
    width: 53,
    height: 53,
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  buttonLogoutMed: {
    backgroundColor: palette.green,
    width: 170,
    height: 53,
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  leftArrowButtonColor: {
    color: '#A7AEBF',
  },
  toolbarButtonContainer: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  loginButtonContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  signupContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarPublicUserContainer: {
    /*esto define el comportamiento de la posicion
        y tamaño del toolbar con respecto a los
        demas componentes de una pantalla,
        dentro de un flex que puede tener cualquier
        otro tipo de estructura */
    flex: 0.15,
    justifyContent: 'center',
  },

  form: {
    flex: 1,
  },
  input: {
    color: palette.grey,
    fontSize: 18,
    backgroundColor: palette.blackLight,
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 13,
    width: 300,
    height: 53,
    marginBottom: 20,
  },
  toolbarPublicUser: {
    //esto define la estructura DENTRO del componente Toolbaar
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignContent: 'center',
    width: 417,
    height: 45,
  },
  toolbarPrivateUser: {
    flexDirection: 'row',
    paddingHorizontal: 80,
    alignContent: 'center',
    width: 417,
    height: 45,
  },
  searchBar: {
    color: palette.grey,
    fontSize: 18,
    backgroundColor: palette.blackLight,
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 13,
    width: 370,
    height: 53,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  switchcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
