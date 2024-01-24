const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: [true, 'The Name field is required.'] },
    address: { type: String, required: [true, 'The address field is required.'] },
    email: { type: String, required: [true, 'The email field is required.'] },
    mobile: { type: Number, required: [true, 'The mobile field is required.'] }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
