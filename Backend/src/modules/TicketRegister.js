const mongoose = require('mongoose');

const ticketRegisterSchema = new mongoose.Schema({
    ticketNumber: { type: String, unique: true, required: [true, 'The Ticket Number field is required.'] },
    fullName: { type: String, required: [true, 'The FullName code field is required.'] },
    address: { type: String, required: [true, 'The address field is required.'] },
    email: { type: String, required: [true, 'The email field is required.'] },
    mobile: { type: Number, required: [true, 'The mobile field is required.'] }
}, { timestamps: true });

const TicketRegister = mongoose.model('TicketRegister', ticketRegisterSchema);

module.exports = TicketRegister;
