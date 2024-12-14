const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const dns = require('dns');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//mongodb://localhost:27017/
mongoose.connect('mongodb://localhost:27017/Web_Project');

const RegistrationSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Registration = mongoose.model('Registration', RegistrationSchema);


app.post('/Registration', (req, res) => {
    Registration.create(req.body)
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)})
})

app.post('/Login', (req, res) => {
    Registration.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.json("User not found");
        }
        if (user.password === req.body.password) {
          return res.json("Login Successful");
        } else {
          return res.json("Login Failed");
        }
      })
      .catch(err => res.status(500).json(err));
  });

const SubscriptionSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
const Subscription = mongoose.model('Subscription', SubscriptionSchema);
  
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
  
    // Validate email format (basic check)
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    Subscription.create({ email })
      .then(() => res.json({ message: 'Subscription successful' }))
      .catch((err) => {
        if (err.code === 11000) {
          // Handle duplicate email error
          res.status(400).json({ message: 'Email already subscribed' });
        } else {
          res.status(500).json({ message: 'Internal server error' });
        }
      });
  });
  

// Load PhishTank CSV data into memory
let phishingUrls = new Set();
fs.createReadStream('./data/verified_online.csv')
  .pipe(csv())
  .on('data', (row) => {
    // The column with URLs in the CSV file is named "url"
    phishingUrls.add(row.url);
  })
  .on('end', () => {
    console.log('PhishTank data loaded successfully');
  });

// Endpoint to check if a URL is phishing
app.post('/check-phishing', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const isPhishing = phishingUrls.has(url);
  if (isPhishing) {
    res.json({ isPhishing: true, message: 'Phishing link detected!' });
  } else {
    res.json({ isPhishing: false, message: 'URL is safe.' });
  }
});
  

app.use(bodyParser.json());

// Helper function to extract domain from email
const getDomainFromEmail = (email) => {
  const domain = email.split('@')[1];
  return domain;
};
// Email Health Check with MailboxLayer API
const MAILBOXLAYER_API_KEY = '';  // Add your MailboxLayer API Key here

app.post('/check-email-health', async (req, res) => {
  const { email } = req.body;
  const domain = getDomainFromEmail(email);

  try {
    // Use axios to call MailboxLayer API for email health check
    const response = await axios.get(`http://apilayer.net/api/check`, {
      params: {
        access_key: MAILBOXLAYER_API_KEY,
        email: email
      }
    });

    const { format_valid, mx_found, spf, dkim, dmarc } = response.data;

    const result = {
      mxRecords: mx_found ? 'Valid' : 'Invalid',
      spf: spf === 'pass' ? 'Valid' : 'Invalid',
      dkim: dkim === 'pass' ? 'Valid' : 'Invalid',
      dmarc: dmarc === 'pass' ? 'Valid' : 'Invalid',
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking email health. Please try again later.' });
  }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
})