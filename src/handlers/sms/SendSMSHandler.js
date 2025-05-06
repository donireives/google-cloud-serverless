const twilio = require('twilio');

class SendSMSHandler {
    static async sendSMS(req, res) {
        try {
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            const message = await client.messages.create({
                body: 'this is a test sms from twilio',
                from: process.env.TWILIO_PHONE_SENDER,
                to: process.env.TWILIO_PHONE_RECEIVER
            });

            return res.status(200).json({
                success: true,
                message: 'SMS successfully sent',
                data: {
                    messageId: message.sid,
                    status: message.status,
                    to: message.to,
                    from: message.from
                }
            });
        } catch (error) {
            console.error('Error sending SMS:', error);
            return res.status(500).json({
                success: false,
                message: 'Gagal mengirim SMS',
                error: error.message
            });
        }
    }
}

module.exports = SendSMSHandler; 