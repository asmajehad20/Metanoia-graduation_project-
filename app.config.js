import 'dotenv/config'
export default{
  "expo": {
    "name": "Metanoia",
    "slug": "Metanoia",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    
    extra :{ 
    apiKey: "AIzaSyDzaT5opWE2O2m8Tt5raFSC9UEnDQ653wo",
    authDomain: "chat-tas.firebaseapp.com",
    projectId: "chat-tas",
    storageBucket: "chat-tas.appspot.com",
    messagingSenderId: "458966050731",
    appId: "1:458966050731:web:e708e3b8fe2676243214ee"

    }
  }
}
