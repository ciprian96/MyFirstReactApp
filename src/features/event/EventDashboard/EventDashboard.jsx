import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Loader } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { getEventsForDashboard } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
]

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {}
  }

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  }

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

  // handleDeleteEvent = eventId => () => {
  //   this.props.deleteEvent(eventId);
  // };

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {

    const { loading, activities } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleContextRef}>
            <EventList loading={loading} moreEvents={moreEvents} events={loadedEvents} getNextEvents={this.getNextEvents} />
          </div>

          {/* <Button onClick={this.getNextEvents} loading={loading} disabled={!this.state.moreEvents} content='More' color='green' floated='right' /> */}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity activities={activities} contextRef={this.state.contextRef} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect(query)(EventDashboard));
