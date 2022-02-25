require('dotenv').config({path: __dirname + '/.env.local'});

var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASEURL
});

const my_phone = process.env.MY_PHONE;
const my_laptop = process.env.MY_LAPTOP;

const token = my_laptop;

const payload = {
    notification: {
        title: 'Title of notification',
        body: 'Text of content',
        // icon: "Url of icon",
        // image: "Url of image to expand the notification"
    }
}
const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
}
admin.messaging().sendToDevice(token, payload, options)
    .then(response => {
        console.log({ response })
    })
    .catch((error) => {
        console.error({ error })
    })
