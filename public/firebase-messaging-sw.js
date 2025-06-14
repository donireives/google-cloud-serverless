// Import and configure the Firebase SDK
// These imports must be placed at the top
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
})

// Retrieve firebase messaging
const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload)
  
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
    badge: '/firebase-logo.png',
    data: payload.data
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
}) 