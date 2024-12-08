# Setup Instructions

1. **Download the folder**  
   Download the `ExitMate` folder.

2. **Create a `.env` file in the `backend` folder**  
   Add the following environment variables to the `.env` file:
   ```env
   MONGO_URI=<YOUR URI>
   JWT_SECRET="<YOUR SECRET KEY>"
   CLIENT_ID=""
   CLIENT_SECRET=""
   REDIRECT_URI=""
   REFRESH_TOKEN=""
   BASE_URL="http://<your ip>:<your port>/"
   
3. **Create an `env.js` file in the `app` folder**
   Add the following code to the `env.js` file:
   ```env
   const MY_URL = "http://<your ip>:<your port>";
   export default MY_URL;
   
4. **Install dependencies**
Run the following commands in their respective directories:

   In the `ExitMate` folder:
      ```bash
      npm install
      ```
   
   In the `backend` folder:
      ```bash
      npm install
      ```

5. **Start the frontend**
In one terminal, navigate to the `ExitMate` folder and run:

   ```bash
   npx expo start
   ```

6. **Start the backend**
In another terminal, navigate to the backend folder and run:

   ```bash
   npx nodemon app
   ```

   Alternatively, you can run:
      ```bash
      nodemon app
      ```

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

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

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
