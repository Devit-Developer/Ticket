const mongoose = require('mongoose');

const compayTicketSchema = new mongoose.Schema({
    company: { type: String, required: [true, 'The company field is required.'] },
    startNumber: { type: String, required: [true, 'The start number field is required.'] },
    endNumber: { type: String, required: [true, 'The end number field is required.'] },
    coin: { type: String, required: [true, 'The coin field is required.'] }
}, { timestamps: true });

const CompanyTicket = mongoose.model('CompanyTicket', compayTicketSchema);

module.exports = CompanyTicket;
