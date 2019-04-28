import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class EventListAttendee extends Component {
  render() {
    const { attend } = this.props;
    return (
      <List.Item>
        <Image as={Link} to={`/profile/${attend.id}`} size="mini" circular src={attend.photoURL} />
      </List.Item>
    );
  }
}

export default EventListAttendee;
