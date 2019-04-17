import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import { GoogleComponent } from "react-google-location";

class GooglePlaceInput extends Component {
  state = {
    address: ""
  };

  onChange = address => this.setState({ address });

  render() {
    const {
      input,
      options,
      placeholder,
      onSelect,
      width,
      coordinates,
      meta: { touched, error }
    } = this.props;

    return (
      <Form.Field error={touched && !!error} width={width}>
        <GoogleComponent
          //apiKey="AIzaSyA5NdTX1mPq4vQcFDREYhbWvubXmOjKJ_o"
          //language={"en"}
          coordinates={coordinates}
          onSelect={onSelect}
          inputProps={{ ...input, placeholder }}
          options={options}
        />
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  }
}

export default GooglePlaceInput;
