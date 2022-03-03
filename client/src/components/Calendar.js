import React from "react";
import { render } from "@testing-library/react";
import withRouter from '../utility/withRouter';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

function Calendar() {
  const userEvents = [
    { description: 'event 1', date: '2022-02-01T16:30', test: 'ignore this' },
    { description: 'event 2', date: '2022-02-02T12:30', test: 'ignore this too' },
  ]
  const calenderEvents = userEvents.map( (row) => {
    return { title: row.description, start: row.date, display: 'block', url: 'http://localhost:3000/ridePage/{row.id}', textColor: 'yellow' }
  });

  render(); {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={calenderEvents}
      />
    )
  }
}

export default withRouter(Calendar);

// { title: 'event 1', date: '2022-02-01' },
//     { title: 'event 2', date: '2022-02-02' },
//     { title: 'go for a ride and chill in the humidity', display: 'block', url: 'http://localhost:3000/calender', start: '2022-02-01T21:30', textColor: 'yellow'}
