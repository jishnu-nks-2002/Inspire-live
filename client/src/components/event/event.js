"use client";

import { useState } from "react";

const UniversityEventsMagazine = () => {
	const [activeCategory, setActiveCategory] = useState("all");

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

	const categoryFilters = [
		{ categoryId: "all", categoryLabel: "All Events" },
		{ categoryId: "conference", categoryLabel: "Conferences" },
		{ categoryId: "festival", categoryLabel: "Festivals" },
		{ categoryId: "sports", categoryLabel: "Sports" },
		{ categoryId: "career", categoryLabel: "Career" }
	];

	const displayEvents = activeCategory === "all" 
		? eventsList 
		: eventsList.filter(evt => evt.eventType === activeCategory);

	return (
		<>
			<style jsx>{`
				.magazine-wrapper {
					background: #ecf0f0;
					padding-bottom: 100px;
					margin-bottom: 100px;
					position: relative;
					padding-top: 60px;
					overflow: hidden;
				}

				.magazine-wrapper::before {
					content: '';
					position: absolute;
					top: -10%;
					right: -5%;
					width: 500px;
					height: 500px;
					background: radial-gradient(circle, rgba(158, 211, 251, 0.15) 0%, transparent 70%);
					border-radius: 50%;
					pointer-events: none;
				}

				.magazine-wrapper::after {
					content: '';
					position: absolute;
					bottom: -10%;
					left: -5%;
					width: 600px;
					height: 600px;
					background: radial-gradient(circle, rgba(26, 89, 138, 0.08) 0%, transparent 70%);
					border-radius: 50%;
					pointer-events: none;
				}

				.magazine-container {
					max-width: 1400px;
					margin: 0 auto;
					padding: 0 40px;
					position: relative;
					z-index: 1;
				}

				.magazine-header {
					text-align: center;
					margin-bottom: 80px;
					animation: fadeInDown 0.8s ease-out;
				}

				.header-badge {
					display: inline-block;
					padding: 8px 24px;
					background: #1a598a;
					color: #ffffff;
					border-radius: 50px;
					font-size: 12px;
					font-weight: 700;
					margin-bottom: 24px;
					letter-spacing: 2px;
					text-transform: uppercase;
					box-shadow: 0 4px 12px rgba(26, 89, 138, 0.25);
				}

				.main-title {
					font-size: 74px;
					font-weight: 900;
					color: #0c1e21;
					margin-bottom: 20px;
					line-height: 1;
					letter-spacing: -2px;
				}

				.main-subtitle {
					font-size: 20px;
					color: #1a425c;
					max-width: 700px;
					margin: 0 auto;
					line-height: 1.6;
					font-weight: 400;
				}

				.filter-section {
					display: flex;
					justify-content: center;
					gap: 12px;
					margin-bottom: 60px;
					flex-wrap: wrap;
					animation: fadeInUp 0.8s ease-out 0.2s both;
				}

				.filter-button {
					padding: 12px 28px;
					background: #ffffff;
					border: 2px solid #ecf0f0;
					border-radius: 50px;
					font-size: 14px;
					font-weight: 600;
					color: #67787a;
					cursor: pointer;
					transition: all 0.3s ease;
					text-transform: uppercase;
					letter-spacing: 1px;
				}

				.filter-button:hover {
					border-color: #1a598a;
					color: #1a598a;
					background: rgba(158, 211, 251, 0.1);
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(26, 89, 138, 0.15);
				}

				.filter-button.active {
					background: #1a598a;
					color: #ffffff;
					border-color: #1a598a;
					box-shadow: 0 4px 16px rgba(26, 89, 138, 0.3);
				}

				.events-masonry {
					display: grid;
					grid-template-columns: repeat(12, 1fr);
					gap: 20px;
					grid-auto-rows: 280px;
				}

				.event-card {
					position: relative;
					border-radius: 16px;
					overflow: hidden;
					cursor: pointer;
					animation: fadeIn 0.8s ease-out both;
					box-shadow: 0 4px 20px rgba(12, 30, 33, 0.08);
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.event-card:hover {
					box-shadow: 0 12px 40px rgba(12, 30, 33, 0.15);
					transform: translateY(-8px);
				}

				.event-card:nth-child(1) {
					grid-column: span 7;
					grid-row: span 2;
				}

				.event-card:nth-child(2) {
					grid-column: span 5;
					grid-row: span 1;
				}

				.event-card:nth-child(3) {
					grid-column: span 5;
					grid-row: span 1;
				}

				.event-card:nth-child(4) {
					grid-column: span 4;
					grid-row: span 1;
				}

				.event-card:nth-child(5) {
					grid-column: span 4;
					grid-row: span 1;
				}

				.event-card:nth-child(6) {
					grid-column: span 4;
					grid-row: span 1;
				}

				.card-image-wrapper {
					position: relative;
					width: 100%;
					height: 100%;
					overflow: hidden;
					background: linear-gradient(135deg, #9ed3fb 0%, #1a598a 100%);
				}

				.card-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
					opacity: 0.9;
				}

				.event-card:hover .card-image {
					transform: scale(1.1);
					opacity: 0.75;
				}

				.card-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(to top, rgba(12, 30, 33, 0.95) 0%, rgba(12, 30, 33, 0.4) 50%, transparent 100%);
					padding: 32px;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					transition: all 0.5s ease;
				}

				.event-card:hover .card-overlay {
					background: linear-gradient(to top, rgba(12, 30, 33, 0.98) 0%, rgba(12, 30, 33, 0.6) 70%, rgba(12, 30, 33, 0.2) 100%);
				}

				.event-card:nth-child(1) .card-overlay {
					padding: 40px;
				}

				.card-badges {
					position: absolute;
					top: 24px;
					left: 24px;
					display: flex;
					gap: 8px;
					z-index: 2;
				}

				.type-badge {
					padding: 6px 16px;
					background: #ffffff;
					color: #0c1e21;
					border-radius: 50px;
					font-size: 10px;
					font-weight: 800;
					text-transform: uppercase;
					letter-spacing: 1.2px;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
				}

				.featured-badge {
					padding: 6px 16px;
					background: #1a598a;
					color: #ffffff;
					border-radius: 50px;
					font-size: 10px;
					font-weight: 800;
					text-transform: uppercase;
					letter-spacing: 1.2px;
					box-shadow: 0 4px 12px rgba(26, 89, 138, 0.4);
					animation: pulse 2s ease-in-out infinite;
				}

				.card-content {
					transform: translateY(0);
					transition: transform 0.5s ease;
					position: relative;
					z-index: 1;
				}

				.event-card:hover .card-content {
					transform: translateY(-8px);
				}

				.card-tagline {
					font-size: 11px;
					color: #9ed3fb;
					font-weight: 700;
					margin-bottom: 8px;
					text-transform: uppercase;
					letter-spacing: 1.5px;
				}

				.card-title {
					font-size: 24px;
					font-weight: 900;
					color: #ffffff;
					margin-bottom: 10px;
					line-height: 1.2;
					letter-spacing: -0.5px;
				}

				.event-card:nth-child(1) .card-title {
					font-size: 42px;
					margin-bottom: 14px;
				}

				.card-description {
					font-size: 15px;
					color: rgba(255, 255, 255, 0.85);
					line-height: 1.5;
					margin-bottom: 16px;
					opacity: 0;
					transform: translateY(10px);
					transition: all 0.5s ease 0.1s;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.event-card:nth-child(1) .card-description {
					-webkit-line-clamp: 3;
					max-width: 90%;
				}

				.event-card:hover .card-description {
					opacity: 1;
					transform: translateY(0);
				}

				.card-meta {
					display: flex;
					gap: 20px;
					flex-wrap: wrap;
				}

				.meta-item {
					display: flex;
					align-items: center;
					gap: 6px;
					font-size: 13px;
					color: rgba(255, 255, 255, 0.8);
					font-weight: 600;
				}

				.meta-icon {
					width: 16px;
					height: 16px;
					color: #9ed3fb;
					flex-shrink: 0;
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fadeInDown {
					from {
						opacity: 0;
						transform: translateY(-30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes pulse {
					0%, 100% {
						box-shadow: 0 4px 12px rgba(26, 89, 138, 0.4);
					}
					50% {
						box-shadow: 0 4px 20px rgba(26, 89, 138, 0.6);
					}
				}

				@media (max-width: 1200px) {
					.events-masonry {
						grid-template-columns: repeat(6, 1fr);
						grid-auto-rows: 260px;
					}

					.event-card:nth-child(1) {
						grid-column: span 6;
						grid-row: span 2;
					}

					.event-card:nth-child(2),
					.event-card:nth-child(3) {
						grid-column: span 3;
					}

					.event-card:nth-child(4),
					.event-card:nth-child(5),
					.event-card:nth-child(6) {
						grid-column: span 2;
					}
				}

				@media (max-width: 768px) {
					.magazine-container {
						padding: 0 20px;
					}

					.main-title {
						font-size: 48px;
					}

					.main-subtitle {
						font-size: 18px;
					}

					.filter-section {
						margin-bottom: 40px;
					}

					.events-masonry {
						grid-template-columns: 1fr;
						gap: 16px;
						grid-auto-rows: auto;
					}

					.event-card:nth-child(1),
					.event-card:nth-child(2),
					.event-card:nth-child(3),
					.event-card:nth-child(4),
					.event-card:nth-child(5),
					.event-card:nth-child(6) {
						grid-column: span 1;
						grid-row: span 1;
					}

					.card-image-wrapper {
						min-height: 320px;
					}

					.card-title,
					.event-card:nth-child(1) .card-title {
						font-size: 24px;
					}

					.card-overlay,
					.event-card:nth-child(1) .card-overlay {
						padding: 24px;
					}

					.card-badges {
						top: 16px;
						left: 16px;
					}

					.card-description {
						-webkit-line-clamp: 2;
					}

					.event-card:nth-child(1) .card-description {
						max-width: 100%;
					}
				}

				@media (max-width: 480px) {
					.magazine-wrapper {
						padding-bottom: 60px;
						margin-bottom: 60px;
					}

					.main-title {
						font-size: 36px;
					}

					.filter-button {
						padding: 10px 20px;
						font-size: 12px;
					}

					.card-image-wrapper {
						min-height: 280px;
					}

					.card-title {
						font-size: 20px;
					}
				}
			`}</style>

			<section className="magazine-wrapper">
				<div className="magazine-container">
					{/* Header */}
					{/* <div className="magazine-header">
						<span className="header-badge">Events Calendar</span>
						<h1 className="main-title">Campus Life</h1>
						<p className="main-subtitle">
							Experience the energy and diversity of our university through world-class events, conferences, and celebrations.
						</p>
					</div> */}

					{/* Filters */}
					<div className="filter-section">
						{categoryFilters.map((filter) => (
							<button
								key={filter.categoryId}
								className={`filter-button ${activeCategory === filter.categoryId ? 'active' : ''}`}
								onClick={() => setActiveCategory(filter.categoryId)}
							>
								{filter.categoryLabel}
							</button>
						))}
					</div>

					{/* Events Masonry */}
					<div className="events-masonry">
						{displayEvents.map((event, index) => (
							<div
								key={event.id}
								className="event-card"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="card-image-wrapper">
									<img
										src={event.eventImage || "/images/events/default-event.webp"}
										alt={event.eventTitle}
										className="card-image"
									/>
									<div className="card-badges">
										<span className="type-badge">{event.eventType}</span>
										{event.eventStatus === 'featured' && (
											<span className="featured-badge">Featured</span>
										)}
									</div>
									<div className="card-overlay">
										<div className="card-content">
											<p className="card-tagline">{event.tagline}</p>
											<h3 className="card-title">{event.eventTitle}</h3>
											<p className="card-description">{event.eventBrief}</p>
											<div className="card-meta">
												<div className="meta-item">
													<svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
													</svg>
													{event.eventDate}
												</div>
												<div className="meta-item">
													<svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
													</svg>
													{event.eventVenue}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default UniversityEventsMagazine;