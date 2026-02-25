"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const ContinuousMentorshipDetails = () => {
	const faqData = [
		{
			question: "What does continuous mentorship throughout my PhD journey include?",
			answer: "Our continuous mentorship program provides ongoing support from admission to graduation. This includes regular one-on-one sessions, research guidance, publication support, career counseling, and help with academic challenges. You'll have a dedicated mentor who understands your goals and provides personalized advice at every stage of your PhD journey."
		},
		{
			question: "How often will I meet with my mentor?",
			answer: "We offer flexible mentorship schedules based on your needs. Typically, students have bi-weekly or monthly structured sessions, with additional support available via email or chat when urgent issues arise. During critical phases like thesis writing or viva preparation, we increase the frequency of sessions to ensure you have the support you need."
		},
		{
			question: "Can my mentor help with research methodology and paper writing?",
			answer: "Absolutely. Our mentors are experienced researchers who provide guidance on research design, methodology selection, data analysis, and academic writing. They review your manuscripts, suggest improvements, help identify suitable journals, and guide you through the publication process to maximize your research impact."
		},
		{
			question: "What if I face challenges with my supervisor or university?",
			answer: "We provide confidential support for navigating difficult situations. Our mentors help you develop communication strategies, understand university policies, and resolve conflicts professionally. If needed, we can facilitate discussions or help you explore options like co-supervisor arrangements or department changes."
		},
		{
			question: "Do you provide career guidance along with academic mentorship?",
			answer: "Yes, career development is a key component of our mentorship program. We help you identify career paths, build your professional network, prepare for academic or industry positions, develop your CV and portfolios, and strategize for post-PhD opportunities aligned with your aspirations."
		},
		{
			question: "How is this different from my university's supervision?",
			answer: "While your university supervisor focuses on your research project, our mentorship provides holistic support covering academic, professional, and personal development. We offer an external perspective, help you navigate institutional processes, provide industry insights, and ensure you're progressing toward your broader career goals beyond just completing your PhD."
		}
	];

	const keyFeatures = [
		"Personalized One-on-One Sessions",
		"Research Methodology Guidance",
		"Publication Strategy Support",
		"Career Development Planning",
		"Academic Writing Assistance",
		"Progress Monitoring",
		"24/7 Email Support"
	];

	const benefits = [
		{
			number: "01",
			title: "End-to-End<br/>Support",
			description: "From your first day of enrollment to your graduation ceremony, we provide comprehensive mentorship that adapts to your evolving needs. Our mentors guide you through coursework, research milestones, publications, and career planning."
		},
		{
			number: "02",
			title: "Experienced Research<br/>Mentors",
			description: "Our mentors are accomplished PhDs and senior researchers with extensive publication records and industry experience. They bring real-world insights, proven strategies, and a deep understanding of the challenges you'll face during your doctoral journey."
		},
		{
			number: "03",
			title: "Accountability &<br/>Motivation",
			description: "Regular check-ins and structured goal-setting keep you on track and motivated. We help you break down overwhelming tasks, celebrate milestones, overcome obstacles, and maintain momentum throughout your multi-year PhD journey."
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
									src="/images/service/service-5.webp"
									alt="Continuous Mentorship Program"
									width={1170}
									height={500}
									style={{ height: "auto", width: "100%" }}
								/>
							</div>

							<h2 className="title title-anim">
								Your dedicated research mentor from admission to graduation
							</h2>

							<div className="blog-text">
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Our Continuous Mentorship Program provides you with personalized, ongoing guidance throughout your entire PhD journey. We understand that pursuing a doctorate is a marathon, not a sprint, and having a consistent mentor who knows your goals, challenges, and progress makes all the difference in your success.
								</p>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Unlike sporadic consultations, our program offers regular touchpoints with experienced mentors who provide strategic advice, accountability, and encouragement. Whether you're struggling with research methodology, preparing for publications, or planning your post-PhD career, your dedicated mentor is there to guide you every step of the way.
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
													src="/images/service/service-2.webp"
													alt="Continuous Mentorship - Detail 1"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="image-box wow fadeInUp" data-wow-delay=".5s">
												<Image
													src="/images/service/service-3.webp"
													alt="Continuous Mentorship - Detail 2"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
									</div>
								</div>

								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Why Choose Our Continuous Mentorship Program?
								</h3>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									A PhD is one of the most challenging academic endeavors you'll undertake. Our mentorship program has helped over 800+ doctoral students successfully navigate their research journey, with 95% of our mentored students completing their PhDs within the planned timeframe. Our mentors bring an average of 15+ years of research experience and have published over 100+ papers collectively, ensuring you receive expert guidance grounded in real academic success.
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
										<Link href="/services/research-proposal-writing">
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
										<Link href="/services/guide-allotment-support">
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

export default ContinuousMentorshipDetails;