const router = require('express').Router();

const SandboxLoginHandler = require('../handlers/auth/SandboxLoginHandler');
const SendMailHandler = require('../handlers/email/SendMailHandler');
const SendSMSHandler = require('../handlers/sms/SendSMSHandler');

router.post('/auth/login', SandboxLoginHandler.validateRequest, SandboxLoginHandler.login);
router.get('/send-mail', SendMailHandler.sendMail);
router.get('/send-sms', SendSMSHandler.sendSMS);

router.get('/', (req, res) => {
    return res.send({'version': process.env.APP_VERSION, 'author': 'Doni R'});
});

module.exports = router;