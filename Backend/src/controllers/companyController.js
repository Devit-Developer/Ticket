const Company = require("../modules/Company");
const timezone = require('timezone');


exports.addCompany = async (req, res) => {

    const companyId = req.params.id;
    const { name, code, address, email, mobile } = req.body;

    try {

        let company;

        if (companyId) {
            // Update existing company
            company = await Company.findByIdAndUpdate(companyId, { name, code, address, email, mobile }, { new: true });
        } else {
            // Create new company
            company = await Company.create({ name, code, address, email, mobile });
        }

        res.status(200).json({ message: 'Company Created successfully' });
    } catch (error) {

        if (error.name === 'ValidationError') {
            const errorMessage = Object.values(error.errors).map((err) => err.message);

            res.status(400).json({ error: errorMessage });
        }
        else if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {

            res.status(400).json({ error: ['Company name is already taken'] });

        } else if (error.code === 11000 && error.keyPattern && error.keyPattern.code) {

            res.status(400).json({ error: ['Company Code is already taken'] });

        } else {
            // Other errors
            res.status(500).json({ error: 'Internal Server Error.' });
        }
    }
};

exports.getCompany = async (req, res) => {
    try {
        const records = await Company.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editCompany = async (req, res) => {
    const recordId = req.params.id;
    try {
        // Use mongoose to find and remove the record by ID
        const result = await Company.findById(recordId);

        if (!result) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCompany = async (req, res) => {
    const recordId = req.params.id;
    try {
        // Use mongoose to find and remove the record by ID
        const result = await Company.findByIdAndDelete(recordId);

        if (!result) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};