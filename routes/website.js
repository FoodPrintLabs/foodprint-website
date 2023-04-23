const express = require('express');
const nodemailer = require('nodemailer');
const { check, validationResult, sanitizeParam } = require('express-validator');
const router = express.Router();
const CUSTOM_ENUMS = require('../utils/enums');
const customSendEmail = require('../config/email/email');
require('dotenv').config();

//about
router.get('/about', function (req, res) {
  res.render('about', { user: req.user, page_name: 'about' });
});

//produce gallery
router.get('/gallery', function (req, res) {
  res.render('gallery', { user: req.user, page_name: 'gallery' });
});

//farmers
router.get('/farmers', function (req, res) {
  res.render('farmers', { user: req.user, page_name: 'farmers' });
});

//markets
router.get('/markets', function (req, res) {
  res.render('markets', { user: req.user, page_name: 'markets' });
});

//retailers
router.get('/retailers', function (req, res) {
  res.render('retailers', { user: req.user, page_name: 'retailers' });
});

//pricing
router.get('/pricing', function (req, res) {
  res.render('pricing', { user: req.user, page_name: 'pricing' });
});

//food101
router.get('/food101', function (req, res) {
  res.render('food101', { user: req.user, page_name: 'food101' });
});

//tech101
router.get('/tech101', function (req, res) {
  res.render('tech101', { user: req.user, page_name: 'tech101' });
});

//contact
router.get('/contact', function (req, res) {
  res.render('contact', { user: req.user, page_name: 'contact' });
});

// return template for what is at the market this week
router.get(
  '/weekly',
  require('connect-ensure-login').ensureLoggedIn({ redirectTo: '/app/auth/login' }),
  function (req, res) {
    res.render('weekly', { user: req.user, page_name: 'weekly' });
  }
);

//return template for how
router.get('/features', function (req, res) {
  res.render('features', { user: req.user, page_name: 'features' });
});

//return template for terms and conditions
router.get('/terms', function (req, res) {
  res.render('termsofuse', { user: req.user, page_name: 'terms' });
});

//return template for privacy policy
router.get('/privacy', function (req, res) {
  res.render('privacypolicy', { user: req.user, page_name: 'privacy' });
});

// Declare the mailing client list
const mailchimpClient = require("@mailchimp/mailchimp_marketing");

mailchimpClient.setConfig({
  apiKey: process.env.MAILCHIMP_APIKEY,
  server: process.env.MAILCHIP_EMAIL_SERVER_PREFIX,
});

//subscribe XmlHTTP request
router.post(
  '/api/newsletter/subscribe',
  [
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array(), success: false });
    } else {
      // Get the subscriber email
      const subscriber_email = req.body.subscribe_email;

      try {
        const response = await mailchimpClient.lists.addListMember(process.env.MAILCHIP_EMAIL_LIST_ID, {
          email_address: subscriber_email,
          status: "subscribed",
        });
        console.log(response);
      } catch (e) {
        //this will eventually be handled by your error handling middleware
        res.json({ success: false, errors: e });
      }
    }
  }
);


//contactform XmlHTTP request
router.post(
  '/demoform',
  [
    check('contact_email', 'Contact email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('contact_name', 'Contact  name should not be empty').not().isEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array(), success: false });
    } else {
      let contact_form_receiver_email = process.env.CONTACT_FORM_EMAIL_ADDRESS;
      let contact_email = req.body.contact_email;
      let contact_name = req.body.contact_name;
      let contact_message = req.body.contact_message;
      let contact_datetime = new Date();
      let contact_subject = 'FoodPrint Website Request Demo Enquiry';

      let contact_message_formatted =
        '<p>Email Sender Name: ' +
        contact_name +
        '<p>Email Sender Email: ' +
        contact_email +
        '</p><p>Email Sent on: ' +
        contact_datetime +
        '</p><p>Email Message: ' +
        'Demo requested ' +
        '</p><br><br><p>Sent from FoodPrint Labs Website Demo Form.</p>';

      // Send Email Using The Config/Email/.. Function
      // customSendEmail(recipient, subject, body)
      customSendEmail(contact_form_receiver_email, contact_subject, contact_message_formatted);
    }
  }
);

//contactform XmlHTTP request
router.post(
  '/contactform',
  [
    check('contact_email', 'Contact email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('contact_message', 'Contact message should not be empty').not().isEmpty(),
    check('contact_name', 'Contact first name should not be empty').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array(), success: false });
    } else {
      let contact_form_receiver_email = process.env.CONTACT_FORM_EMAIL_ADDRESS;
      let contact_email = req.body.contact_email;
      let contact_name = req.body.contact_name;
      let contact_message = req.body.contact_message;
      let contact_datetime = new Date();
      let contact_subject = 'FoodPrint Website Contact Enquiry';

      let contact_message_formatted =
        '<p>Email Sender Name: ' +
        contact_name +
        '<p>Email Sender Email: ' +
        contact_email +
        '</p><p>Email Sent on: ' +
        contact_datetime +
        '</p><p>Email Message: ' +
        contact_message +
        '</p><br><br><p>Sent from FoodPrint Labs Website Contact Form.</p>';

      // Send Email Using The Config/Email/.. Function
      // customSendEmail(recipient, subject, body)
      customSendEmail(contact_email, contact_subject, contact_message_formatted);
      res.json({ success: true, errors: false });
    }
  }
);

module.exports = router;
