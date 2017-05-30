import React from 'react';
import logo from './logo.svg';
import './App.css';


// function CountriesSelect(props) {
//   const countries = props.countries;
//   const listItems = countries.map((country) =>
//     <option name={country.alpha_3_code}>
//       {country.name}
//     </option>
//   );
//   return (
//     <select value={this.state.value} onChange={this.handleChange}>{listItems}</select>
//   );
// }


class VisaForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        country_to : 3,
        citizen_of: "USA"
      },
      countries: []
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

  getCountriesFromApiAsync() {
    const url = 'http://gotorussia.app/reference/countries';
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({countries: responseJson.countries});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadData() {
    this.getCountriesFromApiAsync();
  }

  componentDidMount() {
    this.loadData();
  }

  render() {

    const listCountries = this.state.countries.map((country) =>
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select value={this.state.form.country_to} onChange={this.handleChange}>
            {listCountries}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default VisaForm;
