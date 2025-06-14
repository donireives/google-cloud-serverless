import MainLayout from '../../components/Layout/MainLayout'
import withAuth from '../../components/Hoc/WithAuth'
import { Typography, Button, Card, Space, message, Divider } from 'antd'
import { BellOutlined, KeyOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { getFCMToken } from '../../config/firebase'
import { saveFCMToken, getFCMToken as getStoredFCMToken } from '../../utils/storage'

const { Title, Text } = Typography

function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [fcmToken, setFcmToken] = useState<string | null>(getStoredFCMToken())

    const handleGetFCMToken = async () => {
        setLoading(true)
        try {
            // Request notification permission
            const permission = await Notification.requestPermission()
            
            if (permission === 'granted') {
                const token = await getFCMToken()
                
                if (token) {
                    setFcmToken(token)
                    saveFCMToken(token)
                    message.success('FCM Token berhasil didapatkan dan disimpan!')
                    console.log('FCM Token:', token)
                } else {
                    message.error('Gagal mendapatkan FCM Token')
                }
            } else {
                message.warning('Izin notifikasi ditolak. FCM Token tidak dapat diperoleh.')
            }
        } catch (error) {
            console.error('Error getting FCM token:', error)
            message.error('Terjadi kesalahan saat mendapatkan FCM Token')
        } finally {
            setLoading(false)
        }
    }

    const copyTokenToClipboard = () => {
        if (fcmToken) {
            navigator.clipboard.writeText(fcmToken)
            message.success('Token berhasil disalin ke clipboard!')
        }
    }

    return (
        <MainLayout activePage="dashboard">
            <div className="space-y-6">
                <div className="relative bg-white p-6 rounded-lg shadow-sm">
                    <Title level={2}>Dashboard</Title>
                    <p className="text-gray-600">Selamat datang di dashboard Anda!</p>
                </div>

                {/* FCM Token Section */}
                <Card 
                    title={
                        <Space>
                            <BellOutlined />
                            <span>Firebase Cloud Messaging</span>
                        </Space>
                    }
                    className="shadow-sm"
                >
                    <Space direction="vertical" className="w-full" size="middle">
                        <div>
                            <Text strong>Status FCM Token:</Text>
                            <br />
                            <Text type={fcmToken ? "success" : "warning"}>
                                {fcmToken ? "Token tersimpan" : "Token belum didapatkan"}
                            </Text>
                        </div>

                        {fcmToken && (
                            <div>
                                <Text strong>FCM Token:</Text>
                                <div className="mt-2 p-3 bg-gray-50 rounded border">
                                    <Text code copyable={{ onCopy: copyTokenToClipboard }}>
                                        {fcmToken.substring(0, 50)}...
                                    </Text>
                                </div>
                            </div>
                        )}

                        <Divider />

                        <Space>
                            <Button 
                                type="primary" 
                                icon={<KeyOutlined />}
                                loading={loading}
                                onClick={handleGetFCMToken}
                            >
                                {fcmToken ? 'Perbarui Token' : 'Dapatkan FCM Token'}
                            </Button>

                            {fcmToken && (
                                <Button 
                                    onClick={copyTokenToClipboard}
                                >
                                    Salin Token
                                </Button>
                            )}
                        </Space>

                        <div className="text-sm text-gray-500 mt-2">
                            <p>• Klik tombol di atas untuk mendapatkan FCM token</p>
                            <p>• Token akan digunakan untuk menerima notifikasi push</p>
                            <p>• Pastikan Anda mengizinkan notifikasi di browser</p>
                        </div>
                    </Space>
                </Card>
            </div>
        </MainLayout>
    )
}

export default withAuth(Dashboard) 