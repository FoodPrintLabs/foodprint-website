const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const CUSTOM_ENUMS = require('../../utils/enums');
const uuidv4 = require('uuid/v4');

let moment = require('moment'); //datetime
let initModels = require('../../models/init-models');
let sequelise = require('../../config/db/db_sequelise');
let models = initModels(sequelise);

//emailer configuration
// Testing Emails Pattern
// when testing emails, in NODE_ENV=development, set EMAIL_OVERRIDE
// if EMAIL_OVERRIDE is set, send email to it's value, prepend subject line with [TEST EMAIL], include intended recipients in the body
const emailTransport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.WEBAPP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// test email connection and authentication
console.log('Checking email connection and authentication');
emailTransport
    .verify()
    .then(console.log('Success - email connects and authenticates.'))
    .catch(console.error);

const customSendEmail = async (recipient, subject, body) => {
    //check var
    const toCheck = () => {
        return process.env.NODE_ENV !== CUSTOM_ENUMS.PRODUCTION
            ? '' + process.env.EMAIL_OVERRIDE
            : recipient;
    };
    const subjectCheck = () => {
        return process.env.NODE_ENV !== CUSTOM_ENUMS.PRODUCTION
            ? '[FoodPrint ' + process.env.NODE_ENV + '] -' + subject
            : '[FoodPrint] -' + subject;
    };
    //Details for email sent to customSendEmail
    let mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: toCheck(),
        subject: subjectCheck(),
        html: body,
    };
    let email_logid = uuidv4();
    let logdatetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    let result = ""
    emailTransport.sendMail(mailOptions, function (error, info) {
        console.log("Inside mail transport")
        if (error) {
            console.log("Inside error 1")
            console.log('Error sending email - ', error);
            //res.status.json({ err: error });
            //log to emailModel here
            let data = {
                email_logid: email_logid,
                recipient: recipient,
                subject: subject,
                timestamp: logdatetime,
                content: mailOptions.html,
                status: 'FAILED',
            };
            models.FoodprintEmail.create(data)
                .then(_ => {
                    console.log('Error - Email not sent ' + email_logid);
                   
                })
                .catch(err => {
                    //throw err;
                    console.log('Error - Failed email not saved ' + email_logid);
                    console.log(err.message);
                });
         result = "fail";
        } else {
            console.log(
                'Success - Email successfully sent. Response - %s, Message ID - %s, email record ID - %s',
                info.response,
                info.messageId,
                email_logid
            );

            //log to emailModel here
            let data = {
                email_logid: email_logid,
                recipient: recipient,
                subject: subject,
                timestamp: logdatetime,
                content: mailOptions.html,
                status: 'SENT',
            };
            models.FoodprintEmail.create(data)
                .then(_ => {
                    console.log('Success - Email saved to DB ' + email_logid);
                })
                .catch(err => {
                    //throw err;
                    console.log('Error - Email not sent down ' + email_logid);
                    console.log(err.message);
                    //Update previous saved email in db
                    let data_update = { email_status: 'FAILED' };
                    models.FoodprintEmail.update(data_update, {
                        where: {
                            email_logid: email_logid,
                        },
                    })
                        .then(_ => {
                            console.log('Success - Updated email to FAILED status ' + email_logid);
                        })
                        .catch(err => {
                            //throw err;
                            console.log('Error - Email record not updated to FAILED status ' + email_logid);
                            console.log(err.message);
                        });
                });
                result = "success";
        }
    });
    return result;
};

module.exports = customSendEmail;