import { Link } from "react-router-dom";

function EventsPage() {
  const DUMMY_EVENTS = [
    { id: "e1", title: "Some Event" },
    { id: "e2", title: "Another Event" },
  ];

  return (
    <>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
