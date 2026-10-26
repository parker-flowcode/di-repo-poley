# 03Views — Layout con varios `View`

Proyecto **Expo (SDK 57) + expo-router + TypeScript** que reproduce la interfaz
del enunciado (HEADER, laterales azul/verde, CONTENT y FOOTER) usando varios
`View` anidados y estilos con `StyleSheet`.

## Estructura de la interfaz

```
<View screen>                 // contenedor raíz (flex: 1)
├── <View header>             // HEADER (cian, texto azul)
├── <View row>                // fila central (flex: 1)
│   ├── <View sidebar izq>    // azul
│   ├── <View content>        // gris, texto CONTENT centrado
│   └── <View sidebar der>    // verde
└── <View footer>             // FOOTER (rosa, texto azul)
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

En la salida encontrarás opciones para abrir la app en un móvil con
**Expo Go** (escaneando el QR) o en el navegador con `w` (`npx expo start --web`).

## Cómo comprobarlo en móvil y navegador

- **Móvil**: instala [Expo Go](https://expo.dev/go) y escanea el QR que genera `npx expo start`.
- **Navegador**: pulsa `w` en la terminal o ejecuta `npx expo start --web`.

Comprueba que el HEADER y el FOOTER ocupan todo el ancho, que los laterales
azul y verde llegan de arriba a abajo de la zona central y que CONTENT queda
centrado en el gris, tanto en pantallas pequeñas (móvil) como en escritorio.


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
