const express = require('express');
const router = express.Router();
const { addCompayTicket, getCompanyTicket, editCompanyTicket, deleteCompanyTicket } = require('../controllers/companyTicketController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add-company-ticket/:id?', addCompayTicket);
router.get('/get-company-ticket', getCompanyTicket);
router.get('/edit-company-ticket/:id', editCompanyTicket);
router.delete('/delete-company-ticket/:id', deleteCompanyTicket);

module.exports = router;
