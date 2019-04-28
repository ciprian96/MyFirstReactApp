import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { deleteEvent } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

const mapState = state => ({
  events: state.firestore.ordered.events
});

const actions = {
  deleteEvent
};

class EventDashboard extends Component {
  // state = {
  //   isOpen: false,
  //   selectedEvent: null
  // };

  // handleFormOpen = thing => () => {
  //   this.setState({
  //     selectedEvent: null,
  //     isOpen: true
  //   });
  //   console.log(thing);
  // };

  //   handleFormOpen() {
  //     this.setState({
  //       isOpen: true
  //     });
  //   }

  // handleFormCancel = () => {
  //   this.setState({
  //     isOpen: false
  //   });
  // };

  // handleUpdateEvent = updatedEvent => {
  //   this.setState({
  //     events: this.state.events.map(event => {
  //       if (event.id === updatedEvent.id) {
  //         // copy the updatedEvent in {} => create a new one
  //         return Object.assign({}, updatedEvent);
  //       } else {
  //         return event;
  //       }
  //     }),
  //     isOpen: false,
  //     selectedEvent: null
  //   });
  // };

  // handleUpdateEvent = updatedEvent => {
  //   this.props.updateEvent(updatedEvent);
  //   this.setState({
  //     isOpen: false,
  //     selectedEvent: null
  //   });
  // };

  // handleOpenEvent = eventToOpen => () => {
  //   this.setState({
  //     selectedEvent: eventToOpen,
  //     isOpen: true
  //   });
  // };

  // handleCreateEvent = newEvent => {
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = "./assets/default-user.jpg";
  //   const updatedEvent = [...this.state.events, newEvent];
  //   this.setState({
  //     events: updatedEvent,
  //     isOpen: false
  //   });
  // };

  // handleCreateEvent = newEvent => {
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = "./assets/default-user.jpg";
  //   this.props.createEvent(newEvent);
  //   this.setState({
  //     isOpen: false
  //   });
  // };

  // handleDeleteEvent = eventId => () => {
  //   const updatedEvents = this.state.events.filter(e => e.id !== eventId);
  //   this.setState({
  //     events: updatedEvents
  //   });
  // };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    if (!isLoaded(events) || isEmpty(events)) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
