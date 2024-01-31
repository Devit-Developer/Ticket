const express = require('express');
const router = express.Router();
const { register, login, checkTicket } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/check_ticket_number', checkTicket);

module.exports = router;
