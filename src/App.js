import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";

function App() {
  const [countries, setCountries] = useState(["UK", "US", "INDIA"]);
  const [country, setCountry] = useState('Worldwide');
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = (event) => {
    const countrycode = event.target.value;
    setCountry(countrycode)
  }
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19-TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
          <InfoBox title="CoronaVirus Cases" total={2000} cases={123}></InfoBox>
          <InfoBox title="CoronaVirus Recovered" total={3000} cases={1232}></InfoBox>
          <InfoBox title="CoronaVirus Deaths" total={4000} cases={12323}></InfoBox>
      </div>
    </div>
  );
}

export default App;
