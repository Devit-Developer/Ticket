const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modules/User');
const CompayTicket = require("../modules/CompayTicket");
const Company = require("../modules/Company");
const TicketRegister = require("../modules/TicketRegister");
const { JWT_SECRET } = process.env;

const checkTicketValidity = (ticketNumber) => {
  const [companyCode, ticketNumberPart] = ticketNumber.split('/');

  // Check if ticketNumber has exactly two parts and they are not empty
  return !!(companyCode && ticketNumberPart);
};

exports.checkTicket = async (req, res) => {
  try {
    const { ticketNumber } = req.body;

    if (!checkTicketValidity(ticketNumber)) {
      return res.status(400).json({ error: 'Invalid Ticket Number' });
    }

    const [companyCode, ticketNumberPart] = ticketNumber.split('/');

    const companyDataArray = await Company.find({ code: companyCode });

    if (companyDataArray.length === 0) {
      return res.status(400).json({ error: 'No company found for code' });
    }

    const companyData = companyDataArray[0];

    const companyTicketData = await CompayTicket.find({ company: companyData._id });

    if (companyTicketData.length === 0) {
      return res.status(400).json({ error: 'No company Ticket found for code' });
    }

    const checkNumber = companyTicketData.some((val) => (
      parseInt(val.startNumber) <= parseInt(ticketNumberPart) &&
      parseInt(val.endNumber) >= parseInt(ticketNumberPart)
    ));

    if (checkNumber) {

      const TicketRegisterCount = await TicketRegister.find({ ticketNumber: ticketNumber });

      if (TicketRegisterCount.length > 0) {
        return res.status(400).json({ error: 'Ticket Number All Ready Register' });
      }
      
      return res.status(200).json({ message: 'Valid Ticket Number', companyRecord: companyDataArray });

    } else {

      return res.status(400).json({ error: 'Invalid Ticket Number' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.register = async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, roles });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      // Duplicate username error
      res.status(400).json({ error: 'Username is already taken.' });
    } else {
      // Other errors
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const userSave = await User.findOne({ username });

    // Check if the user exists
    if (!userSave) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, userSave.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    const user = {
      userId: userSave._id,
      username: userSave.username,
    };
    // Generate a JWT token
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
