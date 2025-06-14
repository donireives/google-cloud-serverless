# google-cloud-serverless
A repository containing code examples and configurations for deploying serverless applications on Google Cloud Platform. Includes branches for Cloud Run, Cloud Functions, and other relevant services.

## 🔥 Firebase Cloud Messaging Setup

### Cara Mendapatkan Firebase Service Account Key

1. **Masuk ke Firebase Console**
   
📍 2. **Pilih project kamu**
   (Pastikan ini adalah project yang sama dengan yang dipakai di Flutter/React)

📍 3. **Klik "⚙️ Settings" > "Project settings"**

📍 4. **Klik tab "Service accounts"**

📍 5. **Klik tombol "Generate new private key"**
   💾 Ini akan mengunduh file .json yang berisi semua detail Service Account kamu.

### Environment Variables yang Diperlukan

Setelah mendapatkan file service account, setup environment variables berikut di file `.env`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id",...}

# Optional: FCM Test Token untuk testing ke device spesifik
FCM_TEST_TOKEN=your-device-fcm-token
```

### Endpoint Firebase Cloud Messaging

- **GET** `/send-firebase-notification` - Mengirim sample notifikasi Firebase ke web dan Flutter
