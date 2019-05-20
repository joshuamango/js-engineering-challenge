/*
  JS Engineering Challenge 
  By: Joshua Odeyemi

  Built Using: React, Bootstrap
*/

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Import customer data from json file
let json = require("./customers.json");

// App component
const App = () => {

  // This hook stores field the user is searching in (i.e. searching through email, id's, latitude, etc.)
  const [searchField, changeSearchField] = useState("row-email");

  // This return statement contains the layout of the page
  return (
    <div>
      <div className="input-group mb-3 the-inputs" style={{ marginLeft: "10px", marginTop: "10px" }}>
        <div className="input-group-prepend">
          <button className="btn btn-dark dropdown-toggle" id="dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {searchField.substring(4)}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" onClick={event => changeSearchField("row-id")}>id</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-email")}>email</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-firstName")}>first name</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-lastName")}>last name</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-ip")}>ip</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-latitude")}>latitude</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-longitude")}>longitude</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-createdAt")}>created at</button>
            <button className="dropdown-item" onClick={event => changeSearchField("row-updatedAt")}>updated at</button>
          </div>
        </div>
        <input type="text" id="input" onChange={() => search()} className="form-control" placeholder="Search" aria-label="Search" />
      </div>
      <table id="table" className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">First</th>
            <th scope="col">Last </th>
            <th scope="col">IP</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
          </tr>
        </thead>
        <tbody>
          {/* For every object in the customers array, (which was imported earlier) return a
          table row with the customer's id, email, first name, etc.*/}
          {json.map(customer => {
            return (
              <tr key={customer.id}>
                <th scope="row" className="row-id">{customer.id}</th>
                <td className="row-email">{customer.email}</td>
                <td className="row-firstName">{customer.first_name}</td>
                <td className="row-lastName">{customer.last_name}</td>
                <td className="row-ip">{customer.ip}</td>
                <td className="row-latitude">{customer.latitude}</td>
                <td className="row-longitude">{customer.longitude}</td>
                <td className="row-createdAt">{customer.created_at}</td>
                <td className="row-updatedAt">{customer.updated_at || "null"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  
  function search() {
    // Save references to dom elements
    let searchBar = document.getElementById("input");
    let table = document.getElementById("table")
    let tr = table.getElementsByTagName("tr");
    let filter;

    /* If the user is NOT searching for a time (i.e. createdAt or updatedAt) then 
    all spaces are removed from the input query. */
    if (searchField == "row-createdAt" || searchField == "row.updatedAt") {
      filter = searchBar.value.toUpperCase();
    }
    else {
      filter = searchBar.value.toUpperCase().replace(/\s/g, '');
    }

    

    /* This loop sets the "display" value of a table row to "none" if
    it does not contain text matching the search input value*/
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByClassName(searchField)[0];
      if (td) {
        let txtValue = td.textContent.trimRight() || td.innerText;
        if (txtValue.toUpperCase().includes(filter)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none"
        }
      }
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));