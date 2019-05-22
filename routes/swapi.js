var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET users listing. */

const femaleactors = [];
const maleactors = [];

router.get('/', (req, res, next) => {

    axios.get('https://swapi.co/api/people')
        .then(data => {
            console.log('first page ' + JSON.stringify(data.data))
            res.send(JSON.stringify(responseArray(data.data)))
        })
        .catch(error => {
            console.log(error);
        });


    function responseArray(response){
        let results = response.results;
        console.log('results are ' + JSON.stringify(results));

        for (var i = 0; i < results.length; i++) {
            if (femaleactors.length < 5 && results[i].gender === "female") {
                console.log("female char is " + results[i].name);
                femaleactors.push(results[i]);
            }
            if (maleactors.length < 5 && results[i].gender === "male") {
                console.log("male char is " + results[i].name);
                maleactors.push(results[i]);
            }
        }

        if(maleactors.length < 5 || femaleactors.length < 5){
             callNext(response.next);
        }
        else{
            console.log('male final ' + JSON.stringify(maleactors))
            console.log('female final ' + JSON.stringify(femaleactors))
            return {'male' : maleactors,
            'female' : femaleactors};
        }
    }

    function callNext(url) {
        console.log('next url is ' + url)
         axios.get(url)
            .then(data => {responseArray(data.data)})

    }
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });

});

module.exports = router;
