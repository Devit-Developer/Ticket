const CompayTicket = require("../modules/CompayTicket");

exports.addCompayTicket = async (req, res) => {

    try {
        const companyTicketId = req.params.id;
        const { company, startNumber, endNumber, coin } = req.body;

        if (companyTicketId) {

            await CompayTicket.findByIdAndUpdate(companyTicketId, { company, startNumber, endNumber, coin }, { new: true });

        } else {

            await CompayTicket.create({ company, startNumber, endNumber, coin });
        }

        res.status(200).json({ message: 'Company Created successfully' });

    } catch (error) {

        if (error.name === 'ValidationError') {

            const errorMessage = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({ error: errorMessage });

        } else {

            res.status(500).json({ error: 'Internal Server Error.' });
        }
    }
};

exports.getCompanyTicket = async (req, res) => {
    try {
        const records = await CompayTicket.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editCompanyTicket= async (req, res) => {
    const recordId = req.params.id;
    try {
        // Use mongoose to find and remove the record by ID
        const result = await CompayTicket.findById(recordId);

        if (!result) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCompanyTicket = async (req, res) => {
    const recordId = req.params.id;
    try {
        // Use mongoose to find and remove the record by ID
        const result = await CompayTicket.findByIdAndDelete(recordId);

        if (!result) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};