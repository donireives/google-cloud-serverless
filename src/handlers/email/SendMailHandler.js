const sgMail = require('@sendgrid/mail');

class SendMailHandler {
    static async sendMail(req, res) {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            
            const msg = {
                from: process.env.SENDGRID_EMAIL_SENDER,
                to: process.env.SENDGRID_EMAIL_RECEIVER,
                subject: 'Test Email from SendGrid',
                text: 'this is a test email',
                html: '<strong>this is a test email from sendgrid</strong>',
            };

            await sgMail.send(msg);
            
            return res.status(200).json({
                success: true,
                message: 'Email successfully sent'
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