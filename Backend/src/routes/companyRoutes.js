const express = require('express');
const router = express.Router();
const { addCompany, getCompany, deleteCompany, editCompany } = require('../controllers/companyController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add-company/:id?', addCompany);
router.get('/get-company', authenticateToken, getCompany);
router.delete('/delete-company/:id', deleteCompany);
router.get('/edit-company/:id', editCompany);

module.exports = router;
