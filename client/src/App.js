import React, { Component } from 'react';
 import './App.css';
import './starwars.css'


const API = 'https://swapi.co/api/';
var QUERY = 'people/';
const femaleactors = [];
const maleactors = [];



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      nextUrl: "",
      isMaleloaded: false
    };
  }

   

  componentDidMount() {
       this.callStarwarsApi(API + QUERY);
  }

    callStarwarsApi(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data.results, nextUrl: data.next })
        this.getStarwarsChar() 
      }
      );
  }

    pushStarwarsChar(results) {
  console.log('loaded male ' + this.state.isMaleloaded)
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


  handleClick(event) {      
    this.setState({ isMaleloaded: true });
    event.preventDefault()
}

    getStarwarsChar() {
    console.log("hey yo");
    this.pushStarwarsChar(this.state.results);
    console.log('male ' + maleactors.length);
    console.log('female ' + femaleactors.length);
    if(maleactors.length < 5 || femaleactors.length < 5){
      this.callStarwarsApi(this.state.nextUrl);
    }
    else{
      this.setState({nextUrl: null})
    }
  }

  
    render() {
   
    return (
  <div class="App-header">

<h1 class = "header"> STARWARS - May the force be with you. Always!! </h1>


      <ul>
        <h2 class = "App"> Female Characters  </h2>
        {femaleactors.map(result => (
          <li class = "intro" key={result.name}>
          {result.name} -
          Height : {result.height},
          Mass : {result.mass}
          </li>
        ))}
        </ul>

    <div>
      {this.state.isMaleloaded ? (
          <ul>
            <h2 class="App "> Male Characters </h2>
            {maleactors.map(result => (
                <li class = "intro" key={result.name}>
                  {result.name} -
                  Height : {result.height},
                  Mass : {result.mass}
                </li>
            ))}
          </ul>
      ) : (
          <button class="button" onClick={e => this.handleClick(e)}> CLICK ME! </button>
      )}
    </div>
  </div>
    );
    }
}

export default App; 














