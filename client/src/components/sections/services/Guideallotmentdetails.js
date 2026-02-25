"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const GuideAllotmentDetails = () => {
	const faqData = [
		{
			question: "Why is choosing the right PhD guide important?",
			answer: "Your PhD guide plays a crucial role in shaping your research journey, academic growth, and career trajectory. A compatible guide with expertise in your area ensures proper mentorship, timely completion, quality publications, and valuable professional connections. We help you find supervisors whose research interests, supervision style, and expectations align with your goals."
		},
		{
			question: "How do you help in finding a suitable guide?",
			answer: "We analyze your research interests, academic background, and career goals to identify potential supervisors across universities. We provide detailed profiles of faculty members, their research areas, publication records, supervision history, and available positions. We also facilitate introductions and help you prepare compelling research proposals to attract the right supervisors."
		},
		{
			question: "What if my preferred guide is not available?",
			answer: "We maintain an extensive network of supervisors across multiple institutions and research areas. If your first choice isn't available, we provide alternative recommendations of equally qualified guides. We also help you understand the benefits of different supervisors and make informed decisions based on comprehensive information rather than limited options."
		},
		{
			question: "Can you help with guide-related issues during PhD?",
			answer: "Yes, we provide ongoing support for guide-related challenges including communication difficulties, expectation mismatches, or the need to change supervisors. We offer mediation services, help navigate university procedures for supervisor changes, and assist in finding co-supervisors when beneficial for your research."
		},
		{
			question: "Do you help with approaching potential guides?",
			answer: "Absolutely. We guide you through the entire process of approaching potential supervisors - from crafting compelling introduction emails and research proposals to preparing for initial meetings and interviews. We help you present yourself professionally and demonstrate your research potential effectively."
		},
		{
			question: "What information do you provide about potential guides?",
			answer: "We provide comprehensive profiles including research specializations, recent publications, ongoing projects, supervision capacity, funding availability, lab facilities, collaboration opportunities, completion rates of previous students, and supervisor's expectations. This information helps you make well-informed decisions about your academic future."
		}
	];

	const keyFeatures = [
		"Supervisor Database Access",
		"Research Interest Matching",
		"Faculty Profile Analysis",
		"Introduction Facilitation",
		"Research Proposal Assistance",
		"Interview Preparation",
		"Ongoing Guide Support"
	];

	const benefits = [
		{
			number: "01",
			title: "Perfect Supervisor<br/>Matching",
			description: "We use advanced matching algorithms and personal consultations to connect you with supervisors whose research interests, supervision style, and academic philosophy align perfectly with your goals and working preferences."
		},
		{
			number: "02",
			title: "Comprehensive Faculty<br/>Intelligence",
			description: "Access detailed information about potential supervisors including their research focus, publication record, funding status, supervision history, and student feedback - information not readily available through university websites."
		},
		{
			number: "03",
			title: "Professional Introduction<br/>Support",
			description: "We help you craft compelling communication, prepare strong research proposals, and present yourself professionally to potential supervisors, significantly increasing your chances of securing your preferred guide."
		}
	];

	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="post-details-wrapper">
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src="/images/service/service-6.webp"
									alt="Guide Allotment Support"
									width={1170}
									height={500}
									style={{ height: "auto", width: "100%" }}
								/>
							</div>

							<h2 className="title title-anim">
								Find the perfect PhD supervisor who aligns with your research goals
							</h2>

							<div className="blog-text">
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Our Guide Allotment Support service helps you identify and connect with the ideal PhD supervisor for your research journey. We understand that the right supervisor-student relationship is fundamental to PhD success, and we use our extensive network and expertise to facilitate perfect matches.
								</p>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									With access to a comprehensive database of faculty members across universities and detailed insights into their research areas, supervision styles, and availability, we help you make informed decisions. Our personalized approach ensures you find a guide who not only has expertise in your field but also supports your academic and career aspirations.
								</p>

								<ul className="wow fadeInUp" data-wow-delay=".3s">
									{keyFeatures.map((feature, index) => (
										<li key={index}>
											<span>
												<i className="tji-check"></i>
											</span>
											{feature}
										</li>
									))}
								</ul>

								<div className="images-wrap">
									<div className="row">
										<div className="col-sm-6">
											<div className="image-box wow fadeInUp" data-wow-delay=".3s">
												<Image
													src="/images/service/service-4.webp"
													alt="Guide Allotment - Detail 1"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="image-box wow fadeInUp" data-wow-delay=".5s">
												<Image
													src="/images/service/service-7.webp"
													alt="Guide Allotment - Detail 2"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
									</div>
								</div>

								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Why Choose Our Guide Allotment Service?
								</h3>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Finding the right PhD supervisor can be challenging and time-consuming. Our specialized service simplifies this process by providing you with curated recommendations based on comprehensive research and analysis. With our network spanning 200+ universities and 5000+ faculty profiles, we've successfully matched 1000+ students with ideal supervisors. Our success rate of 92% in supervisor satisfaction demonstrates our commitment to quality matchmaking.
								</p>

								<div className="details-content-box">
									{benefits.map((benefit, index) => (
										<div
											key={index}
											className="service-details-item wow fadeInUp"
											data-wow-delay={`.${(index + 1) * 2}s`}
										>
											<span className="number">{benefit.number}.</span>
											<h6 
												className="title"
												dangerouslySetInnerHTML={{ __html: benefit.title }}
											/>
											<div className="desc">
												<p>{benefit.description}</p>
											</div>
										</div>
									))}
								</div>

								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Frequently Asked Questions
								</h3>
								<BootstrapWrapper>
									<div className="accordion tj-faq style-2" id="faqOne">
										{faqData.map((faq, index) => (
											<div
												key={index}
												className={`accordion-item ${index === 0 ? 'active' : ''} wow fadeInUp`}
												data-wow-delay=".3s"
											>
												<button
													className={`faq-title ${index !== 0 ? 'collapsed' : ''}`}
													type="button"
													data-bs-toggle="collapse"
													data-bs-target={`#faq-${index + 1}`}
													aria-expanded={index === 0 ? 'true' : 'false'}
												>
													{faq.question}
												</button>
												<div
													id={`faq-${index + 1}`}
													className={`collapse ${index === 0 ? 'show' : ''}`}
													data-bs-parent="#faqOne"
												>
													<div className="accordion-body faq-text">
														<p>{faq.answer}</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</BootstrapWrapper>
							</div>

							<div className="tj-post__navigation mb-0 wow fadeInUp" data-wow-delay="0.3s">
								<div className="tj-nav__post previous">
									<div className="tj-nav-post__nav prev_post">
										<Link href="/services/continuous-mentorship-program">
											<span><i className="tji-arrow-left"></i></span>
											Previous
										</Link>
									</div>
								</div>
								<Link href="/services" className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								<div className="tj-nav__post next">
									<div className="tj-nav-post__nav next_post">
										<Link href="/services/phd-enrolment-support">
											Next
											<span><i className="tji-arrow-right"></i></span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GuideAllotmentDetails;