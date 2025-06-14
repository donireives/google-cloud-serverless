import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app)

// Function to get FCM token
export const getFCMToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "your-vapid-key" // Add your VAPID key here
    })
    
    if (currentToken) {
      console.log('FCM Token:', currentToken)
      return currentToken
    } else {
      console.log('No registration token available.')
      return null
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err)
    return null
  }
}

// Function to handle foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
      resolve(payload)
    })
  }) 