const express = require('express');
const router = express.Router();
const { addCompayTicket, getCompanyTicket, editCompanyTicket, deleteCompanyTicket } = require('../controllers/companyTicketController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add-company-ticket/:id?', authenticateToken, addCompayTicket);
router.get('/get-company-ticket', authenticateToken, getCompanyTicket);
router.get('/edit-company-ticket/:id', authenticateToken, editCompanyTicket);
router.delete('/delete-company-ticket/:id', authenticateToken, deleteCompanyTicket);

module.exports = router;
