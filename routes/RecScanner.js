var express = require('express');
var router = express.Router();

// export GOOGLE_APPLICATION_CREDENTIALS='./My First Project-600582d6e817.json';

// const {Vision} = require('@google-cloud/vision');

// const vision = new Vision({
//     projectId: 'caramel-caster-220821',
//     keyFilename: '/My First Project-600582d6e817.json'
// });

// var vision = require('@google-cloud/vision')({
//     projectId: 'caramel-caster-220821',  // replace with your project Id
//     credentials: require('./My First Project-600582d6e817.json') // replace this with yours
// });

const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

/* GET home page. */
router.get('/RecScanner', (req, res, next) => returnResult(req, res));   // CHANGE HERE <------------------

async function returnResult(req, res) {
    try {
        req.receipt = './test2.jpg';
        const data = await getReceiptText(req.receipt);
        // const data = await getReceiptText('~/Desktop/test.jpg');
        // const items = data;
        res.send(data);
    } catch (e) {
        console.log(e);
    }
}

async function getReceiptText(filename) {
    try {
        // result = null;
        //         //
        //         // client.textDetection(filename)
        //         //     .then(results => {
        //         //         const detections = results[0].textAnnotations;
        //         //         console.log('Text:');
        //         //         detections.forEach(text => console.log(text));
        //         //
        //         //     })
        //         //     .catch(err => {
        //         //         console.error('ERROR:', err);
        //         //     });
        //         //
        //         // return results;

        results = null;

        client.textDetection(filename)
            .then(result => {
                const detections = result[0].textAnnotations;
                console.log('Text:');
                results = detections[0].description;
                console.log(results);
                // detections.forEach(text => console.log(text));

            })
            .catch(err => {
                console.error('ERROR:', err);
            });

        return results;

    } catch (e) {
        throw e.response
    }
}

module.exports = router;
