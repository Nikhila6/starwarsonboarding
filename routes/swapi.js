var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET users listing. */

const femaleactors = [];
const maleactors = [];

router.get('/', (req, res, next) => {

    axios.get('https://swapi.co/api/people')
        .then(data => { responseArray(data.data)
                .then(data => {
                    res.send(JSON.stringify(data))
                })
        })

        .catch(error => {
            console.log(error);
        });


    function responseArray(response){

    return new Promise(function (resolve,reject) {

            let results = response.results;

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

            if (maleactors.length < 5 || femaleactors.length < 5) {
                callNext(response.next);
            }
            else {
                resolve({male: maleactors,female: femaleactors});
            }
        })
    }

    function callNext(url) {
         axios.get(url)
             .then(data => {
                 return responseArray(data.data)
             })

    }

});

module.exports = router;
