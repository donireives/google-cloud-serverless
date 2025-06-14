const admin = require('firebase-admin');

class SendFirebaseNotificationHandler {
    static async sendFirebaseNotification(req, res) {
        try {
            if (!admin.apps.length) {
                const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
                
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    projectId: process.env.FIREBASE_PROJECT_ID
                });
            }
            
            const notificationData = {
                notification: {
                    title: 'Notifikasi Baru',
                    body: 'Anda mendapat notifikasi baru dari aplikasi'
                },
                data: {
                    id: 'NOTIF_001',
                    code: 'NEW_ORDER',
                    timestamp: new Date().toISOString(),
                    action: 'open_detail',
                    extra_data: JSON.stringify({
                        orderId: 12345,
                        userId: 67890,
                        priority: 'high'
                    })
                }
            };
            
            let message;
            
            if (process.env.FCM_TEST_TOKEN) {
                message = {
                    ...notificationData,
                    token: process.env.FCM_TEST_TOKEN
                };
            } else {
                message = {
                    ...notificationData,
                    topic: topic
                };
            }

            // Kirim notifikasi
            const response = await admin.messaging().send(message);
            
            return res.status(200).json({
                success: true,
                message: 'Notifikasi Firebase berhasil dikirim',
                messageId: response,
                sentData: {
                    notification: notificationData.notification,
                    data: notificationData.data,
                    target: process.env.FCM_TEST_TOKEN ? 'device_token' : 'topic',
                    targetValue: process.env.FCM_TEST_TOKEN || topic
                }
            });
            
        } catch (error) {
            console.error('Error mengirim notifikasi Firebase:', error);
            return res.status(500).json({
                success: false,
                message: 'Gagal mengirim notifikasi Firebase',
                error: error.message,
                troubleshooting: {
                    message: 'Pastikan FIREBASE_SERVICE_ACCOUNT_KEY dan FIREBASE_PROJECT_ID sudah diset di environment variables',
                    example_env: {
                        FIREBASE_PROJECT_ID: 'your-project-id',
                        FIREBASE_SERVICE_ACCOUNT_KEY: 'JSON string dari service account key',
                        FCM_TEST_TOKEN: 'optional - device token untuk testing'
                    }
                }
            });
        }
    }
}

module.exports = SendFirebaseNotificationHandler; 