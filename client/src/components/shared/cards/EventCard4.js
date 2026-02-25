import Link from "next/link";

const EventCard4 = ({ event }) => {
	const {
		eventTitle = "Annual Academic Conference",
		eventImage = "/new-imges/events/event-1.jpg",
		eventBrief,
		id,
		eventType = "conference",
		eventDate,
		tagline,
	} = event || {};

	return (
		<div className="project-item h4-project-item">
			<div className="project-content">
				<span className="categories">
					<Link href="/events">{eventType}</Link>
				</span>
				<div className="project-text">
					<h4 className="title">
						<Link href="/events">{eventTitle}</Link>
					</h4>
					<Link className="tji-icon-btn" href="/events">
						<i className="tji-arrow-right-long"></i>
					</Link>
				</div>
			</div>
			<div className="project-img">
				<img src={eventImage} alt={eventTitle} />
			</div>
		</div>
	);
};

export default EventCard4;