import React, { useState, useEffect } from 'react'
import { notification } from 'antd'
import { onMessageListener } from '../../config/firebase'

interface NotificationPayload {
  notification?: {
    title?: string
    body?: string
  }
  data?: {
    [key: string]: string
  }
}

const NotificationDisplay: React.FC = () => {
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    const handleForegroundMessage = async () => {
      try {
        const payload = await onMessageListener() as NotificationPayload
        
        if (payload) {
          api.info({
            message: payload.notification?.title || 'Notifikasi Baru',
            description: payload.notification?.body || 'Anda mendapat notifikasi baru',
            placement: 'topRight',
            duration: 4.5,
            onClick: () => {
              console.log('Notification clicked', payload.data)
              // Handle notification click
              if (payload.data?.action === 'open_detail') {
                // Navigate or perform action based on data
                console.log('Opening detail with data:', payload.data)
              }
            }
          })
          
          console.log('Foreground notification received:', payload)
        }
      } catch (error) {
        console.error('Error handling foreground message:', error)
      }
    }

    handleForegroundMessage()
  }, [api])

  return contextHolder
}

export default NotificationDisplay 