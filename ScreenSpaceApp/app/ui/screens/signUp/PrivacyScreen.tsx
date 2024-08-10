import {Center, Heading, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import CountryFlag from 'react-native-country-flag';

export default function PrivacyScreen() {
  return (
    <ScrollView>
      <VStack space="5">
        <Center>
          <CountryFlag isoCode="ar" size={25} />
        </Center>
        <Center>
          <Heading fontSize="xl">Política de privacidad de ScreenSpace</Heading>
          <Text fontSize="xs">
            En ScreenSpace, nos tomamos muy en serio la privacidad de nuestros
            usuarios. Esta política de privacidad describe cómo recopilamos,
            utilizamos y protegemos la información personal que los usuarios
            proporcionan al utilizar la aplicación móvil ScreenSpace API.
          </Text>
          <Text fontSize="xs">
            1. Información personal recopilada: • Información de registro: Al
            registrarse en la aplicación, se recopila el nombre, dirección de
            correo electrónico y la información de inicio de sesión del usuario.
            • Información de pago: Cuando un usuario realiza una compra en la
            aplicación, se recopila información de pago, como el número de
            tarjeta de crédito y la dirección de facturación. • Información de
            uso: Se recopila información sobre cómo los usuarios utilizan la
            aplicación, incluyendo la información sobre las películas que han
            visto y las calificaciones que han dado. 2. Uso de la información
            personal: • La información de registro se utiliza para identificar
            al usuario y proporcionar una experiencia personalizada en la
            aplicación. • La información de pago se utiliza para procesar las
            transacciones realizadas por el usuario. • La información de uso se
            utiliza para proporcionar recomendaciones personalizadas de
            películas y mejorar la experiencia del usuario en la aplicación. 3.
            Compartir información personal: • ScreenSpace no comparte la
            información personal de los usuarios con terceros sin su
            consentimiento expreso, excepto cuando se requiere por ley. •
            ScreenSpace puede compartir la información personal del usuario con
            los cines asociados para procesar las transacciones de compra de
            boletos. 4. Seguridad de la información personal: • ScreenSpace
            utiliza medidas de seguridad razonables para proteger la información
            personal de los usuarios. • La información de pago se transmite
            utilizando un protocolo de seguridad (SSL) y se almacena en
            servidores seguros. 5. Retención de información personal: •
            ScreenSpace retiene la información personal del usuario durante el
            tiempo que sea necesario para proporcionar los servicios de la
            aplicación y cumplir con las obligaciones legales. 6. Derechos de
            los usuarios: • Los usuarios tienen derecho a acceder, corregir o
            eliminar su información personal en cualquier momento. • Los
            usuarios pueden optar por no recibir comunicaciones promocionales en
            cualquier momento. 7. Modificaciones a la política de privacidad: •
            ScreenSpace se reserva el derecho de modificar esta política de
            privacidad en cualquier momento y sin previo aviso. • Los cambios a
            la política de privacidad se publicarán en la aplicación y se
            considerarán efectivos inmediatamente después de su publicación.
          </Text>
          <Text fontSize="xs">
            Si tiene alguna pregunta o inquietud sobre esta política de
            privacidad, no dude en ponerse en contacto con nosotros a través de
            la aplicación o enviando un correo electrónico a nuestro equipo de
            atención al cliente.
          </Text>
        </Center>
        <Center>
          <CountryFlag isoCode="us" size={25} />
        </Center>
        <Center>
          <Heading fontSize="xl">Privacy Policy for ScreenSpace</Heading>
          <Text fontSize="xs">
            At ScreenSpace, we take the privacy of our users very seriously.
            This privacy policy describes how we collect, use, and protect the
            personal information that users provide when using the ScreenSpace
            API mobile application.
          </Text>
          <Text fontSize="xs">
            1. Personal Information Collected: • Registration Information: When
            users register for the application, we collect their name, email
            address, and login information. • Payment Information: When a user
            makes a purchase through the application, we collect payment
            information such as credit card number and billing address. • Usage
            Information: We collect information on how users use the
            application, including information on movies they have seen and
            ratings they have given. 2. Use of Personal Information: •
            Registration information is used to identify the user and provide a
            personalized experience within the application. • Payment
            information is used to process transactions made by the user. •
            Usage information is used to provide personalized movie
            recommendations and improve the user experience within the
            application. 3. Sharing of Personal Information: • ScreenSpace does
            not share user personal information with third parties without their
            express consent, except when required by law. • ScreenSpace may
            share user personal information with affiliated theaters to process
            ticket purchase transactions. 4. Security of Personal Information: •
            ScreenSpace uses reasonable security measures to protect user
            personal information. • Payment information is transmitted using a
            secure protocol (SSL) and stored on secure servers. 5. Retention of
            Personal Information: • ScreenSpace retains user personal
            information for as long as necessary to provide the services of the
            application and comply with legal obligations. 6. User Rights: •
            Users have the right to access, correct, or delete their personal
            information at any time. • Users may opt-out of receiving
            promotional communications at any time. 7. Modifications to Privacy
            Policy: • ScreenSpace reserves the right to modify this privacy
            policy at any time without notice. • Changes to the privacy policy
            will be posted within the application and will be considered
            effective immediately upon posting.
          </Text>
          <Text fontSize="xs">
            If you have any questions or concerns about this privacy policy,
            please do not hesitate to contact us through the application or by
            emailing our customer support team.
          </Text>
        </Center>
      </VStack>
    </ScrollView>
  );
}
