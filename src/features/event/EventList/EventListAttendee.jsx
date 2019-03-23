import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class EventListAttendee extends Component {
  render() {
    const { attend } = this.props;
    return (
      <List.Item>
        <Image as="a" size="mini" circular src={attend.photoURL} />
      </List.Item>
    );
  }
}

export default EventListAttendee;
