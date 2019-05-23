import React, { Component } from 'react';
 import './App.css';
import './starwars.css'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        results: [],
        maleactorsfinal: [],
        femaleactorsfinal: [],
        isMaleloaded: false
    };
  }

  componentDidMount() {
      fetch('swapi')
          .then(res => res.json())
          .then(data=> { this.setState({ maleactorsfinal: data.male, femaleactorsfinal: data.female})
              })
  }


  handleClick(event) {      
    this.setState({ isMaleloaded: true });
    event.preventDefault()
}


    render() {
   return (
  <div className ="App-header">

<h1 className = "header"> STARWARS - May the force be with you. Always!! </h1>


      <ul>
        <h2 className = "App App-link"> Female Characters  </h2>
        {this.state.femaleactorsfinal.map(result => (
          <li className = "intro" key={result.name}>
          {result.name} -
          Height : {result.height},
          Mass : {result.mass}
          </li>
        ))}
        </ul>

    <div>
      {this.state.isMaleloaded ? (
          <ul>
            <h2 className="App App-link"> Male Characters </h2>
            {this.state.maleactorsfinal.map(result => (
                <li className = "intro" key={result.name}>
                  {result.name} -
                  Height : {result.height},
                  Mass : {result.mass}
                </li>
            ))}
          </ul>
      ) : (
          <button className="button" onClick={e => this.handleClick(e)}> CLICK ME! </button>
      )}
    </div>
  </div>
    );
    }
}

export default App;



/*import React, { Component } from 'react';
import './App.css';
import './starwars.css'


const femaleactors = [];
const maleactors = [];

class App extends Component {
    state = {
        results: [],
        nextUrl: "",
        isMaleloaded: false
    };

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callStarwarsApi()
            .then(res => this.setState({ data: res.express }))
            .then(data => {
                this.setState({ results: data.results, nextUrl: data.next })
                this.getStarwarsChar()
            })
            .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callStarwarsApi = async () => {
        const response = await fetch('/swapi');
        const body = await response.json();
        console.log("response is " + JSON.stringify(body));

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

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
            <div className ="App-header">

                <h1 className = "header"> STARWARS - May the force be with you. Always!! </h1>


                <ul>
                    <h2 className = "App App-link"> Female Characters  </h2>
                    {femaleactors.map(result => (
                        <li className = "intro" key={result.name}>
                            {result.name} -
                            Height : {result.height},
                            Mass : {result.mass}
                        </li>
                    ))}
                </ul>

                <div>
                    {this.state.isMaleloaded ? (
                        <ul>
                            <h2 className="App App-link"> Male Characters </h2>
                            {maleactors.map(result => (
                                <li className = "intro" key={result.name}>
                                    {result.name} -
                                    Height : {result.height},
                                    Mass : {result.mass}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <button className="button" onClick={e => this.handleClick(e)}> CLICK ME! </button>
                    )}
                </div>
            </div>
        );
    }
}

export default App; */















