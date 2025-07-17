// server file to handle get and requests from the client
const express = require("express");
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const pool = require('../model/db');

var model = require('../model/index');

const app = express();
const staticPath = path.join(__dirname, '../view/dist');

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Signup post request
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Call signup model with request information
  model.signupModel(username, email, password, (result) => {
    // If successful, create a token for the user
    if (result.success) {
      const token = jwt.sign(
        { username: result.username, email: result.email }, // Use directly username and email
        'This_1_Is_2_A_3_Secret_4!',
        { expiresIn: '12h' }
      );

      res.status(200).json({ success: true, token: token });
    } else { // Otherwise, return the relevant error message
      res.status(401).json({ success: false, message: result.message });
    }
  });
});


// Login post request
app.post('/login', (req, res) => {
  const { email, password, rememberMe } = req.body;

  // Call to login model with email and password
  model.loginModel(email, password, (result) => {
    // If the user logged in successfully
    if (result.success) {
      // Extract user email from the JWT token payload
      const profileEmail = result.user.profile_email;

      // Give a token based on their remember me setting
      const expiresIn = rememberMe ? '7d' : '12h';

      const token = jwt.sign(
        { username: result.user.profile_username, profile_email: profileEmail }, // Use profile_email here
        'This_1_Is_2_A_3_Secret_4!',
        { expiresIn: expiresIn }
      );

      res.status(200).json({ success: true, token: token });
    } else { // Failed to log in
      res.status(401).json({ success: false, message: result.message });
    }
  });
});


// Settings post request for change username
app.post('/changeusername', (req, res) => {
  const { curUser, username, password } = req.body;

  // Call the settings model to verify information
  model.changeUserModel(curUser, username, password, (result) => {
    if (result.success)
      res.status(200).json({ success: true });
    else
      res.status(401).json({ success: false, message: result.message });
  });
});

// Settings post request for delete account
app.post('/deleteaccount', (req, res) => {
  const { curUser, password } = req.body;

  model.deleteAccountModel(curUser, password, (result) => {
    if (result.success)
      res.status(200).json({ success: true });
    else
      res.status(400).json({ success: false, message: result.message });
  });
});

// cv process post request
app.post('/cvprocess', function(req, res) {
  try {
    // Verify and decode the JWT token to extract user information
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'This_1_Is_2_A_3_Secret_4!'); // Replace 'your_secret_key' with your actual secret key

    // Extract user's profile email from the decoded token
    const profileEmail = decoded.profile_email;

    // Initialize cvData object
    const cvData = {
      page1: {},
      page2: {},
      page3: {},
      page4: {}
    };

    // Check if the request contains data for the first page
    if (req.body.cv_firstname !== undefined) {
      cvData.page1 = {
        cv_firstname: req.body.cv_firstname,
        cv_lastname: req.body.cv_lastname,
        cv_phonenumber: req.body.cv_phonenumber,
        cv_email: req.body.cv_email, // Associate cv_email with CV data
        cv_country: req.body.cv_country
      };
      console.log('Data for page 1 received and logged:', cvData.page1);
    }

    // Check if the request contains data for the second page
    if (req.body.cv_colour !== undefined) {
      cvData.page2 = {
        cv_colour: req.body.cv_colour
      };
      console.log('Data for page 2 received and logged:', cvData.page2);
    }

    if (req.body.cv_mbti !== undefined) {
      cvData.page3 = {
        cv_mbti: req.body.cv_mbti,
        cv_about: req.body.cv_about,
      };
      console.log('Data for page 3 received and logged:', cvData.page3);
    }

    if (req.body.cv_video !== undefined){
      cvData.page4 = {
        cv_video: req.body.cv_video
      };
      console.log('Data for page 4 received and logged:', cvData.page4);
    }

    // Call cvModel with cvData and profileEmail
    model.cvModel(cvData, profileEmail, (response) => {
      // Send response back to the client
      res.status(200).json(response);
    });
  } catch (error) {
    console.error('Error handling CV data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// add post post request
app.post('/addpost', function(req, res) {

  // Verify and decode the JWT token to extract user information
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'This_1_Is_2_A_3_Secret_4!'); // Replace 'your_secret_key' with your actual secret key

  // Extract user's profile email from the decoded token
  const profileEmail = decoded.profile_email;

  var jobPostData = {
      job_post_title: req.body.job_post_title,
      job_post_category: req.body.job_post_category,
      job_post_date: req.body.job_post_date,
      job_post_description: req.body.job_post_description,
      job_post_image: req.body.job_post_image
  };
  console.log('Job post data:', jobPostData);


  // Validate the presence of required fields
  if (!jobPostData.job_post_title || !jobPostData.job_post_category || !jobPostData.job_post_date || !jobPostData.job_post_description) {
      console.error('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
  }

  model.addPostModel(jobPostData, profileEmail, function(response) {
      if (!response) {
          console.error('Error adding post:', err);
          return res.status(500).json({ message: 'Failed to add post. Please try again.' });
      }

      // If no error, send success response
      res.status(200).json({ message: 'Job post data submitted successfully' });
      console.log('Job post data submitted successfully:', response);
  });
});


// add post post request
app.post('/wallet', function(req, res) {
  console.log('Request body:', req.body); // Log the entire request body
  var wallet_title = req.body.wallet_title; // Extract wallet_title from request body
  console.log('Wallet title:', wallet_title); // Log the extracted wallet_title

  // Call the model with walletData and a callback function to handle the response
  model.walletModel(wallet_title, function(result){
    if (!result.success) {
      console.error('Error creating wallet:', result.error);
      return res.status(500).json({ message: 'Failed to create wallet. Please try again.' });
    }

    // If no error, send success response
    res.status(200).json({ message: 'Wallet submitted successfully', data: result.data });
    console.log('Wallet submitted successfully:', result);
  });
});






app.get('*', function (req, res) {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Assign the port to the server
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, function() {
  console.log("Server running on port " + PORT);
});

// Graceful shutdown functionality for database connection
function gracefulShutdown() {
  pool.end().then(() => {
    console.log('Pool has been closed');
    process.exit(0);
  });
}

// If the server is killed in anyway, close the pool
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
