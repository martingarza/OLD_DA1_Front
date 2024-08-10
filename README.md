# ScreenSpace
La aplicación móvil de ScreenSpace es una solución completa para los cinéfilos que les permite explorar, comprar y disfrutar de las películas en cines cercanos de manera más eficiente y personalizada. Los usuarios pueden buscar películas, ver horarios de proyección, comprar boletos y calificar películas después de verlas. La aplicación también proporciona recomendaciones personalizadas basadas en la calificación y los datos de visualización del usuario.

## Comenzando 🚀

_Estas instrucciones permiten obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

* [NodeJS](https://nodejs.org/es/)
* [Watchman](https://facebook.github.io/watchman/)
* [JDK11](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)
* [Android Studio](https://developer.android.com/studio/)
* [ReactNative](https://reactnative.dev/)
* [NativeBase](https://docs.nativebase.io/)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [Google Sign-in for React Native](https://github.com/react-native-google-signin/google-signin)

### Creating a new application
```bash
npx react-native@latest init screenspaceapp
```

- [Setting up the development environment](https://reactnative.dev/docs/environment-setup)

## Running

```
npx react-native start
```

Run instructions for Android: Have an Android emulator running (quickest way to get started), or a device connected.
```
cd "... /dai-tp-frontend/screenspaceapp" && npx react-native run-android
```

Run instructions for iOS:
```
cd "... /dai-tp-frontend/screenspaceapp" && npx react-native run-ios
```
or
```
Open screenspaceapp/ios/screenspaceapp.xcworkspace in Xcode or run "xed -b ios" and Hit the Run button.
```

## Run instructions for macOS:
- See [https://aka.ms/ReactNativeGuideMacOS](https://aka.ms/ReactNativeGuideMacOS) for the latest up-to-date instructions.

### Instalación 🔧

_Una serie de ejemplos paso a paso que debes ejecutar para tener un entorno de desarrollo ejecutandose_

1. Descomprimir el contenido de este ZIP

    Unix-based
    ```Bash
    $ unzip main.zip -d /tmp/screenspace
    ```
    
    Windows
    ```PowerShell
    PS C:\> Expand-Archive -Path 'C:\main.zip' -DestinationPath 'C:\screenspace\'
    ```

2. Descargar las dependencias del backend

...

3. Establecer configuración

...

4. Iniciar el frontend mediante emulación

...


## Comandos utiles

Reinstalar Pods
```Bash
pod deintegrate

pod install
```

[Start Integrating Google Sign-In into Your Android App](https://developers.google.com/identity/sign-in/android/start-integrating)
[Authenticating Your Client](https://developers.google.com/android/guides/client-auth)
```Bash
./android/gradlew signingReport
```

## Ejecutando las pruebas ⚙️

...

### Análisis de pruebas end-to-end 🔩

Detallado en documento x

## Despliegue 📦

...

## Construido con 🛠️

_herramientas utilizadas para crear el frontend_

- https://easyappicon.com/
- 

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/sbroccardi/dai-tp-frontend/tags).

## Documentación
- [Miro](https://miro.com/app/board/uXjVMbn0zvo=/)

## Referencias
- [Example to Use React Native Vector Icons](https://aboutreact.com/react-native-vector-icons/)
- [Catalogo de iconos](https://oblador.github.io/react-native-vector-icons/)
- [Managing Configuration in React Native](https://medium.com/differential/managing-configuration-in-react-native-cd2dfb5e6f7b)

## Autores ✒️

* Sorgentini, Ignacio - *Legajo 1126105* (isorgentini@uade.edu.ar)
* Severi, Pedro - *Legajo 1129592* (peseveri@uade.edu.ar)
* Güerini, Timoteo - *Legajo 1106625* (tguerini@uade.edu.ar)
* Gil Broccardi, Sergio - *Legajo 1126105* (isorgentini@uade.edu.ar)
