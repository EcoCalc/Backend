var axios = require('axios')
var _ = require('lodash')
var express = require('express');

var router = express.Router();
const api_url = "https://trackapi.nutritionix.com/v2/natural/nutrients"

router.post('/receipt', (req, res, next) => returnResult(req, res));

async function returnResult(req, res) {
    try {
        // let sampleString = "for breakfast i ate 3 eggs, bacon and cheese";
        const data = await getFoodItems(req.body.query);
        console.log(data)
        res.send(data);
    } catch (e) {
        console.log(e.response);
    }
}

async function getFoodItems(picStrings) {
    try {
        console.log('calling item')
        const res = await axios.post(api_url, {
            query: picStrings
        }, {
            headers: {
                'x-app-id': 'f7a22d78',
                'x-app-key': '5270ade74c71a5ef3b06beeec67164b8',
                'x-remote-user-id': '0'
            }
        })
        let foods = []
        _.map(res.data.foods, (item) => {
            console.log(item)
            foods.push({
                food_name: item.food_name,
                photo: item.photo
            })
        })
        return foods
    } catch (e) {
        console.log(e.response)
    }

    return result;
}

module.exports = router;
