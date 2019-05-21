var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET users listing. */

const femaleactors = [];
const maleactors = [];

router.get('/', (req, res, next) => {

    var url = 'https://swapi.co/api/people';
    var id=1;
    axios.get('https://swapi.co/api/people')
        .then(data => {
            console.log('data is' + JSON.stringify(data.data.results))
            getStarwarsChar(data.data);
            console.log('female : ' + femaleactors);
            console.log('next url is ' + data.data.next)
            res.send(JSON.stringify(femaleactors))
            //res.send(JSON.stringify(maleactors))
        })
        .catch(error => {
            console.log(error);
        });

    function getStarwarsChar(resultdata)
    {
        console.log("hey yo");
        pushStarwarsChar(resultdata.results);
        console.log('male ' + maleactors.length);
        console.log('female ' + femaleactors.length);

        if(maleactors.length < 5 || femaleactors.length < 5){
            var i=1;
            axios.get(resultdata.next);
        }
        // else{
        //     this.setState({nextUrl: null})
        // }
    }

    function pushStarwarsChar(results)
    {
        //console.log('loaded male ' + this.state.isMaleloaded)
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
    }
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });

});

module.exports = router;
