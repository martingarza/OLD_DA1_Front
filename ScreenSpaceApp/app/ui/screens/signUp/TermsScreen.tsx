import {Center, Heading, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import CountryFlag from 'react-native-country-flag';

export default function TermsScreen() {
  return (
    <ScrollView>
      <VStack space="5">
        <Center>
          <CountryFlag isoCode="ar" size={25} />
        </Center>
        <Center>
          <Heading fontSize="xl">Términos y condiciones de ScreenSpace</Heading>
          <Text fontSize="xs">
            1. Uso de la aplicación: Al utilizar la aplicación móvil
            ScreenSpace, el usuario acepta cumplir con los términos y
            condiciones establecidos en este acuerdo. 2. Información
            proporcionada: La aplicación proporciona información sobre las
            películas que se están proyectando actualmente en los cines
            asociados, incluyendo la información sobre el reparto, director,
            sinopsis, imágenes y trailers. Sin embargo, no garantizamos la
            precisión de esta información, ya que depende de la información
            proporcionada por los cines asociados. 3. Compra de boletos: Los
            usuarios pueden comprar boletos a través de la aplicación utilizando
            una pasarela de pago segura. Los boletos electrónicos se envían al
            teléfono móvil del usuario y deben ser presentados en el cine para
            entrar. 4. Calificación de películas: Después de ver una película,
            los usuarios pueden calificarla utilizando el sistema de
            calificación de la aplicación. La calificación y los datos de
            visualización del usuario pueden ser utilizados para proporcionar
            recomendaciones personalizadas de películas que pueden ser de
            interés para el usuario. 5. Propiedad intelectual: Todos los
            derechos de propiedad intelectual relacionados con la aplicación son
            propiedad de ScreenSpace. El usuario no tiene derecho a utilizar o
            reproducir el contenido de la aplicación sin el consentimiento
            previo por escrito de ScreenSpace. 6. Limitación de responsabilidad:
            ScreenSpace no se hace responsable de los errores u omisiones en la
            información proporcionada por los cines asociados, ni de los
            problemas técnicos o de otro tipo que puedan surgir al utilizar la
            aplicación. 7. Modificaciones a los términos y condiciones:
            ScreenSpace se reserva el derecho de modificar estos términos y
            condiciones en cualquier momento y sin previo aviso. El uso continuo
            de la aplicación después de la modificación de los términos y
            condiciones implica la aceptación de los mismos. 8. Jurisdicción y
            ley aplicable: Este acuerdo se rige por las leyes del país de
            residencia de ScreenSpace y cualquier disputa que surja en relación
            con este acuerdo se resolverá en los tribunales competentes de dicho
            país.
          </Text>
        </Center>
        <Center>
          <CountryFlag isoCode="us" size={25} />
        </Center>
        <Center>
          <Heading fontSize="xl">Terms and Conditions of ScreenSpace</Heading>
          <Text fontSize="xs">
            1. Use of the Application: By using the ScreenSpace mobile
            application, the user agrees to comply with the terms and conditions
            set forth in this agreement. 2. Provided Information: The
            application provides information about currently showing movies in
            associated cinemas, including information about the cast, director,
            synopsis, images, and trailers. However, we do not guarantee the
            accuracy of this information as it depends on the information
            provided by associated cinemas. 3. Ticket Purchases: Users may
            purchase tickets through the application using a secure payment
            gateway. Electronic tickets are sent to the user's mobile phone and
            must be presented at the cinema to enter. 4. Movie Ratings: After
            watching a movie, users can rate it using the application's rating
            system. The user's rating and viewing data may be used to provide
            personalized movie recommendations that may be of interest to the
            user. 5. Intellectual Property: All intellectual property rights
            related to the application are owned by ScreenSpace. The user has no
            right to use or reproduce the content of the application without the
            prior written consent of ScreenSpace. 6. Limitation of Liability:
            ScreenSpace is not responsible for errors or omissions in the
            information provided by associated cinemas, or for technical or
            other issues that may arise when using the application. 7.
            Modifications to Terms and Conditions: ScreenSpace reserves the
            right to modify these terms and conditions at any time and without
            prior notice. Continued use of the application after modification of
            the terms and conditions implies acceptance of the same. 8.
            Jurisdiction and Applicable Law: This agreement is governed by the
            laws of the country of ScreenSpace's residence, and any dispute
            arising in connection with this agreement will be resolved in the
            competent courts of said country.
          </Text>
        </Center>
      </VStack>
    </ScrollView>
  );
}
