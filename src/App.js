import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import reactStringReplace from "react-string-replace";


class App extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        request: PropTypes.string,
    };

  constructor(props) {
    super(props);


    this.state = {
        search: null,
        title: "Search for a movie",
        url: "http://www.omdbapi.com/?i=tt3896198&apikey=af8045b&s=",
        suggestions: [],
        currQuery: "",
        tags: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
      if (this.props.title !== undefined && this.props.request !== undefined) {
        this.setState({title: this.props.title, request: this.props.request});
      }
  }

    /* On input change make API call with the input search query of length > 3*/
  handleInputChange(e) {

      //If there is no search query don't render suggestions box yet
      if (e.valueOf().length < 4) {
          this.setState({search: null});
          this.setState({suggestions: []});
      }
      //if there are 5 movies don't allow user to search
      if (this.state.tags.length >= 5) {
          this.setState({search: "You can only have 5 movies in the search bar."})
          return;
      }
      else {
          this.setState({search: "No Matches Found"});
          this.setState({currQuery: e.valueOf()});
      }

    fetch(this.state.url + e.valueOf()).then(function(res) {
        if (res.ok) {
          return res.json();
        }
    }).then(function(json)
      {
        if (json.Response !== "False" && e.valueOf().length > 3) {

          //only show movies that have a title and a year & make sure movie index is less than 11
            //so it only shows at most 10 movies
          let s = json.Search.filter((movie,i) => (movie.Title != null && movie.Year != null && i < 11));
          if (s.length > 0) {this.setState({suggestions: s})};
        }
      }.bind(this)).catch(function(error) { console.log(error)});
  }

  render() {
    return (
        <div className="container">
          <div className="text-container">
            <span>{this.state.title}</span>
          </div>
          <Typeahead
              clearButton
              id="main"
              labelKey="Title"
              paginate={true}
              maxResults={10}
              multiple
              //for each child highlight the substrings that match the current query
              renderMenuItemChildren={function(option) {
                  let x = reactStringReplace(option.Title, this.state.currQuery, (match, i) => (
                      <span key={i} style={{fontWeight:"bold"}} className="spacer">{match}</span>
                  ));
                  return <div>
                      <div>{x}</div>
                      <small> {option.Year}</small>
                  </div>

              }.bind(this)}
              options={this.state.suggestions}
              onInputChange={(e) => this.handleInputChange(e)}
              placeholder="Search by title..."
              emptyLabel={ this.state.search}
              onChange={(e) => {
                      this.setState({tags: e});
              }}

          />
        </div>
    )
  }
};
export default App;
