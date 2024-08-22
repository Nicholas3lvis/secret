import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const myServer = express();
const port = 5000;

const API_URL = 'https://secrets-api.appbrewery.com/random';
myServer.use(bodyParser.urlencoded({ extended: true }));
myServer.use(express.static('public'));

myServer.get('/', async (req, res) => {
    let content = '';
    let username = '';

    try {
        const result = await axios.get(API_URL);
        if (result.data && result.data.secret && result.data.username) {
            content = result.data.secret;
            username = result.data.username;
        } else {
            content = 'No secrets available';
            username = 'Unknown';
        }
    } catch (error) {
        content = 'Error occurred';
        username = 'No name';
    }

    res.render('index.ejs', { content, username });
});

myServer.listen(port, () => {
    console.log(`The server is running at port ${port}`);
});
