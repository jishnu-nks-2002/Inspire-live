"use client";
import getALlServices from "@/libs/getALlServices";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ServiceCard11 from "../cards/ServiceCard11";

const ServicesSlider4 = ({ showOnlyPhD = false, biggerCards = false }) => {
	const allServices = getALlServices();
	
	// Filter to only show PhD India and PhD Abroad if showOnlyPhD is true
	const services = showOnlyPhD 
		? allServices?.filter(service => 
			service.slug === 'phd-india' || service.slug === 'phd-abroad'
		)
		: allServices?.slice(0, 6);

	return (
		<Swiper
			slidesPerView={1}
			spaceBetween={15}
			loop={services?.length > 1}
			speed={1500}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
			}}
			pagination={{
				el: ".swiper-pagination-area",
				clickable: true,
			}}
			breakpoints={{
				768: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: biggerCards ? 2 : 2,
					spaceBetween: 30,
				},
				1200: {
					spaceBetween: 30,
					slidesPerView: biggerCards ? 2 : 3,
				},
				1400: {
					spaceBetween: biggerCards ? 40 : 30,
					slidesPerView: biggerCards ? 2 : 3,
				},
			}}
			modules={[Pagination, Autoplay]}
			className={`h10-service-slider ${biggerCards ? 'h10-service-slider-bigger' : ''}`}
		>
			{services?.length
				? services?.map((service, idx) => (
						<SwiperSlide key={idx}>
							<ServiceCard11 service={service} idx={idx} biggerCard={biggerCards} />
						</SwiperSlide>
				  ))
				: ""}
			<div className="swiper-pagination-area"></div>
		</Swiper>
	);
};

export default ServicesSlider4;