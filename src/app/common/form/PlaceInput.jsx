import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import Script from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class PlaceInput extends Component {
  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  onChange = address => this.setState({ address });

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  render() {
    const {
      input,
      width,
      onSelect,
      placeholder,
      options,
      searchOptions,
      meta: { touched, error }
    } = this.props;

    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5NdTX1mPq4vQcFDREYhbWvubXmOjKJ_o&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            inputProps = {{...input, placeholder}}
            value={this.state.address}
            onSelect={onSelect}
            options={options}
            onChange={this.handleChange}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: placeholder,
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  }
}

export default PlaceInput;
