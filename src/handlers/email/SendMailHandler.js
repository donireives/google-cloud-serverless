const sgMail = require('@sendgrid/mail');

class SendMailHandler {
    static async sendMail(req, res) {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            
            const msg = {
                to: 'doni4869@gmail.com', // receiver email
                from: process.env.SENDGRID_EMAIL_SENDER, // sender email
                subject: 'Test Email dari SendGrid',
                text: 'Ini adalah email test dari SendGrid',
                html: '<strong>Ini adalah email test dari SendGrid</strong>',
            };

            await sgMail.send(msg);
            
            return res.status(200).json({
                success: true,
                message: 'Email berhasil dikirim'
            });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                success: false,
                message: 'Gagal mengirim email',
                error: error.message
            });
        }
    }
}

module.exports = SendMailHandler; 