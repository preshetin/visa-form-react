import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class VisaForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: {
        country_to : 1,
        citizen_of: "USA"
      },
      countries: {},
      movies: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handling submit');
  }



   getMoviesFromApiAsync() {
     const url = 'https://facebook.github.io/react-native/movies.json';

     return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.movies);
        this.setState({movies: responseJson.movies});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCountriesFromApiAsync() {

    const url = 'http://gotorussia.app/reference/countries';

   return fetch(url)
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson.countries);
       this.setState({countries: responseJson.countries});
     })
     .catch((error) => {
       console.error(error);
     });
 }

  loadData() {
    console.log('loading data');
    this.getCountriesFromApiAsync();
    this.getMoviesFromApiAsync();
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Countries: {this.state.countries.length}:
          Movies: {this.state.movies.length}:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default VisaForm;
