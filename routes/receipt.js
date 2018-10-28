var http = require('http');
var express = require('express');
var router = express.Router();

router.get('/receipt/', (req, res, next) => returnResult(req, res));

async function returnResult(req, res) {
    try {
    		let sampleString = "for breakfast i ate 3 eggs, bacon and cheese";
    		const data = await getFoodItems(sampleString);
    		res.send(data);
    } catch (e) {
        console.log(e);
    }
}

async function getFoodItems(picStrings) {
	var post_options = {
			url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
			method: 'POST',
			headers: {
				'x-app-id': 'f7a22d78',
				'x-app-key': '5270ade74c71a5ef3b06beeec67164b8',
				'x-remote-user-id': '0'
			},
			body: {
				'query':picStrings
			}
	};
	console.log(post_options);
	
	result = null;
	try {
		http.request(post_options, (res) => {
			res.setEncoding('utf8');
			console.log(res);
			// res.on('data', (chunk) => {console.log('Response: ' + chunk);});
			result = res;
			});
	} catch (e) {
		console.log(e);
		result = e;
	}
	
	return result;
}

module.exports = router;
