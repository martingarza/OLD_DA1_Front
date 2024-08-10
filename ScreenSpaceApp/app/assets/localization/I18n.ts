import {I18n as i18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './languages/en';
import es from './languages/es';

const locales = RNLocalize.getLocales();
const translations = {es, en};
var I18n = new i18n(translations);

I18n.locale = locales[0].languageCode;
I18n.enableFallback = true;

console.log(locales);

export default I18n;
