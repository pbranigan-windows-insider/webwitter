const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    // Here you would typically save the email to your database
    console.log(`Received subscription from: ${email}`);
    res.send('Thank you for subscribing!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
