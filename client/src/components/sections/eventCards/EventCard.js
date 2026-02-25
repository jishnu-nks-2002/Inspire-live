"use client";
import EventCard4 from "@/components/shared/cards/EventCard4";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Events4 = () => {
	// Events data from your events page
	const eventsList = [
		{
			id: 1,
			eventTitle: "Annual Academic Conference",
			tagline: "Advancing Research & Innovation",
			eventBrief: "Join researchers, faculty, and students as they present groundbreaking research across multiple disciplines and foster collaborative learning.",
			eventImage: "/new-imges/events/event-1.jpg",
			eventDate: "March 15-17, 2024",
			eventVenue: "Main Auditorium, Central Campus",
			eventType: "conference",
			participantCount: "800+",
			eventStatus: "featured"
		},
		{
			id: 2,
			eventTitle: "Freshers' Orientation Week",
			tagline: "Welcome to Our Community",
			eventBrief: "A comprehensive orientation program to help new students transition smoothly into university life.",
			eventImage: "/new-imges/events/event-2.jpg",
			eventDate: "August 1-7, 2024",
			eventVenue: "University Campus",
			eventType: "orientation",
			participantCount: "2000+",
			eventStatus: "upcoming"
		},
		{
			id: 3,
			eventTitle: "Science & Tech Symposium",
			tagline: "Innovation Through Excellence",
			eventBrief: "Showcasing cutting-edge research in science, technology, engineering, and mathematics.",
			eventImage: "/new-imges/events/event-3.jpg",
			eventDate: "September 20-21, 2024",
			eventVenue: "Science Block",
			eventType: "symposium",
			participantCount: "500+",
			eventStatus: "featured"
		},
		{
			id: 4,
			eventTitle: "Cultural Fest 2024",
			tagline: "Celebrating Diversity",
			eventBrief: "A vibrant cultural festival celebrating diverse talents through music, dance, drama, and art.",
			eventImage: "/new-imges/events/event-4.jpg",
			eventDate: "October 10-12, 2024",
			eventVenue: "Open Air Theater",
			eventType: "festival",
			participantCount: "3000+",
			eventStatus: "upcoming"
		},
		{
			id: 5,
			eventTitle: "Career Fair 2024",
			tagline: "Bridging Academia & Industry",
			eventBrief: "Connect with leading companies for internships, placements, and career guidance.",
			eventImage: "/new-imges/events/event-5.jpg",
			eventDate: "November 5-6, 2024",
			eventVenue: "Convention Hall",
			eventType: "career",
			participantCount: "100+ Companies",
			eventStatus: "featured"
		},
		{
			id: 6,
			eventTitle: "Annual Sports Meet",
			tagline: "Excellence in Athletics",
			eventBrief: "Inter-departmental sports championship featuring various indoor and outdoor sports.",
			eventImage: "/new-imges/events/event-6.jpg",
			eventDate: "December 1-5, 2024",
			eventVenue: "Sports Complex",
			eventType: "sports",
			participantCount: "1500+",
			eventStatus: "upcoming"
		}
	];

	const eventsToShow = eventsList.slice(0, 3);
	const events = [...eventsToShow, ...eventsToShow];

	return (
		<section className="tj-project-section-4 section-gap">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading style-4 text-center">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								<i className="tji-box"></i>Campus Events
							</span>
							<h2 className="sec-title title-anim">
								Breaking Boundaries, Building Dreams.
							</h2>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="project-wrapper wow fadeInUp" data-wow-delay=".5s">
							<Swiper
								slidesPerView={1.2}
								spaceBetween={15}
								loop={true}
								speed={1500}
								centeredSlides={false}
								autoplay={{
									delay: 6000,
								}}
								pagination={{
									el: ".swiper-pagination-area",
									clickable: true,
								}}
								breakpoints={{
									576: {
										slidesPerView: 1.5,
										spaceBetween: 20,
									},
									768: {
										slidesPerView: 2,
										spaceBetween: 20,
									},
									992: {
										slidesPerView: 2.4,
										spaceBetween: 30,
									},
									1200: {
										slidesPerView: 3,
										spaceBetween: 30,
									},
								}}
								modules={[Pagination, Autoplay]}
								className="project-slider-3"
							>
								{events?.length
									? events?.map((event, idx) => (
											<SwiperSlide key={idx}>
												<EventCard4 event={event} />
											</SwiperSlide>
									  ))
									: ""}
								<div className="swiper-pagination-area"></div>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Events4;