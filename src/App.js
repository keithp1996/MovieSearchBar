import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

import './App.css'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /* On input change make API call with the input search query of length > 3*/
  handleInputChange(e) {

    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=af8045b&s=${e.valueOf()}`).then(function(res) {
        if (res.ok) {
          return res.json();
        }
    }).then(function(json)
      {
        if (json.Response !== "False" && e.valueOf().length > 3) {
          let s = [];
          var i;
          for (i = 0; json.Search.length > i; i++) {
            s.push({
                  id:json.Search[i].Title,
                  text: json.Search[i].Title,
                  year: json.Search[i].Year
                  });
          }
          if (s.length > 0) {this.setState({suggestions: s})};
        }
      }.bind(this));
  }

  render() {
    return (
        <div className="container">
          <div className="text-container">
            <span>Search for a movie</span>
          </div>
          <Typeahead
              clearButton
              id="main"
              labelKey="id"
              paginate={true}
              maxResults={10}
              renderMenuItemChildren={(option) => (
                  <div>
                    <div>{option.id}</div>
                    <small> {option.year}</small>
                  </div>
              )}
              multiple
              options={this.state.suggestions}
              onInputChange={(e) => this.handleInputChange(e)}
              placeholder="Search by title..."
          />
        </div>
    )
  }
};
export default App;
