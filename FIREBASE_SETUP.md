# Setup Firebase Cloud Messaging (FCM)

## Langkah-langkah Setup:

### 1. Konfigurasi Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih atau buat project Firebase Anda
3. Masuk ke Project Settings > General tab
4. Cari bagian "Your apps" dan pilih Web App
5. Salin konfigurasi Firebase

### 2. Update Konfigurasi Firebase
Edit file `src/config/firebase.ts` dan ganti nilai-nilai berikut dengan konfigurasi Firebase Anda:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key", // Dari Firebase config
  authDomain: "your-project.firebaseapp.com", // Dari Firebase config
  projectId: "your-project-id", // Dari Firebase config
  storageBucket: "your-project.appspot.com", // Dari Firebase config
  messagingSenderId: "123456789", // Dari Firebase config
  appId: "your-app-id" // Dari Firebase config
}
```

### 3. Dapatkan VAPID Key
1. Di Firebase Console, masuk ke Project Settings > Cloud Messaging tab
2. Di bagian "Web configuration", generate atau salin Web Push certificates (VAPID key)
3. Update `vapidKey` di file `src/config/firebase.ts`:

```typescript
vapidKey: "your-vapid-key" // Ganti dengan VAPID key Anda
```

### 4. Update Service Worker
Edit file `public/firebase-messaging-sw.js` dan ganti konfigurasi Firebase:

```javascript
firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
})
```

### 5. Testing
1. Jalankan aplikasi: `npm run dev`
2. Buka Dashboard dan klik tombol "Dapatkan FCM Token"
3. Izinkan permission notifikasi di browser
4. Salin FCM token yang muncul
5. Gunakan token tersebut di backend Anda untuk mengirim test notification

### 6. Backend Integration
Gunakan FCM token yang didapat di frontend untuk variable `FCM_TEST_TOKEN` di backend Anda:

```bash
# Di .env backend
FCM_TEST_TOKEN=token_yang_didapat_dari_frontend
```

## Troubleshooting

### Error: "Messaging: We are unable to register the default service worker"
- Pastikan file `firebase-messaging-sw.js` ada di folder `public/`
- Pastikan konfigurasi Firebase di service worker sama dengan di `firebase.ts`

### Error: "The registration token is not a valid FCM registration token"
- Pastikan VAPID key sudah benar
- Pastikan konfigurasi Firebase sudah sesuai
- Coba hapus cache browser dan refresh

### Notifikasi tidak muncul
- Pastikan permission notifikasi sudah diizinkan
- Cek console browser untuk error
- Pastikan service worker terdaftar dengan benar

## Fitur yang Sudah Tersedia

1. **Get FCM Token**: Tombol di Dashboard untuk mendapatkan dan menyimpan FCM token
2. **Foreground Notifications**: Notifikasi akan muncul sebagai Ant Design notification saat aplikasi aktif
3. **Background Notifications**: Notifikasi browser native saat aplikasi tidak aktif
4. **Token Storage**: Token disimpan di localStorage untuk penggunaan ulang
5. **Copy Token**: Fitur copy token ke clipboard untuk kemudahan testing 