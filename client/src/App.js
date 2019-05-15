import React, { Component } from 'react';
import './App.css';


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
      <div>
      <ul>
        <h1> STARWARS - GIRLS  </h1>
        {femaleactors.map(result => (
          <li key={result.name}>
          {result.name} - 
          Height : {result.height} -  
          Mass : {result.mass}
          </li>
        ))}
        </ul>

        <div>
        <button onClick={(e) => this.handleClick(e)}> CLICK ME! </button> 
        </div>

        <div>
        {this.state.isMaleloaded ? (
        <ul>
        <h1> STARWARS - MEN  </h1>
        {maleactors.map(result => (
          <li key={result.name}>
          {result.name} - 
          Height : {result.height} -  
          Mass : {result.mass}
          </li>
        ))} 
        </ul> 
        ) : (' ') }
        </div>
        </div>

        );
    }
  }


export default App; 














