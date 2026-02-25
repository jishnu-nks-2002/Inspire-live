"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const SupportTillCompletionDetails = () => {
	const faqData = [
		{
			question: "What does 'Support Till Completion' include?",
			answer: "Our comprehensive support covers your entire PhD journey from enrollment to successful completion. This includes continuous academic guidance, research methodology support, publication assistance, thesis writing help, viva preparation, and troubleshooting any academic or administrative challenges that arise during your PhD tenure."
		},
		{
			question: "How long does the support continue?",
			answer: "We provide support throughout your entire PhD duration - typically 3-5 years for full-time students and 4-6 years for part-time students. Our commitment doesn't end until you successfully defend your thesis and receive your doctoral degree."
		},
		{
			question: "What kind of research support do you provide?",
			answer: "We offer guidance on research design, data collection methods, statistical analysis, literature review strategies, research ethics, and publication strategies. Our experts help you navigate research challenges, refine your methodology, and ensure your work meets international academic standards."
		},
		{
			question: "Do you help with thesis writing and formatting?",
			answer: "Yes, we provide comprehensive thesis writing support including structure planning, chapter development, academic writing guidance, citation management, and formatting as per university guidelines. We also offer editing and proofreading services to ensure your thesis meets the highest academic standards."
		},
		{
			question: "How do you help with publications during PhD?",
			answer: "We guide you in identifying suitable journals, preparing manuscripts, responding to reviewer comments, and navigating the publication process. Publishing during your PhD strengthens your academic profile and is often a requirement for degree completion. We help you achieve the required publication milestones."
		},
		{
			question: "What happens if I face difficulties with my supervisor?",
			answer: "We act as mediators and provide guidance on resolving conflicts professionally. If necessary, we help you navigate the process of changing supervisors or finding co-supervisors. Our goal is to ensure you have the academic support needed to complete your research successfully."
		}
	];

	const keyFeatures = [
		"Continuous Academic Mentorship",
		"Research Methodology Guidance",
		"Publication & Conference Support",
		"Thesis Writing Assistance",
		"Viva Voce Preparation",
		"Progress Monitoring",
		"24/7 Academic Support"
	];

	const benefits = [
		{
			number: "01",
			title: "End-to-End<br/>Research Support",
			description: "From research design to final defense, we provide continuous guidance on methodology, data analysis, literature review, and all aspects of your research journey to ensure academic excellence."
		},
		{
			number: "02",
			title: "Publication &<br/>Academic Writing",
			description: "Expert assistance in preparing research papers, conference presentations, and thesis chapters. We help you publish in reputed journals and build a strong academic portfolio during your PhD."
		},
		{
			number: "03",
			title: "Viva Preparation &<br/>Defense Success",
			description: "Comprehensive preparation for your thesis defense including mock vivas, question anticipation, presentation skills, and confidence building to ensure you successfully defend your research."
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
									alt="Support Till Completion"
									width={1170}
									height={500}
									style={{ height: "auto", width: "100%" }}
								/>
							</div>

							<h2 className="title title-anim">
								Complete PhD journey support from enrollment to successful degree completion
							</h2>

							<div className="blog-text">
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Our Support Till Completion service ensures you're never alone in your PhD journey. We provide continuous academic, research, and administrative support throughout your doctoral program, helping you overcome challenges and maintain steady progress toward your degree.
								</p>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									With dedicated mentors and subject experts, we guide you through research milestones, publication requirements, thesis writing, and defense preparation. Our proven track record of 95% completion rate demonstrates our commitment to your success.
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
													alt="Support Till Completion - Detail 1"
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
													alt="Support Till Completion - Detail 2"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
									</div>
								</div>

								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Why Choose Our Complete PhD Support?
								</h3>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Complete your PhD with confidence through our comprehensive support system. We don't just help you start your journey - we ensure you finish it successfully. With regular progress reviews, personalized guidance, and expert assistance at every stage, we've helped 500+ scholars complete their PhDs on time. Our holistic approach addresses academic, technical, and emotional aspects of the PhD journey.
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
										<Link href="/services/phd-enrolment-support">
											<span><i className="tji-arrow-left"></i></span>
											Previous
										</Link>
									</div>
								</div>
								<Link href="/services" className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								<div className="tj-nav__post next" style={{ visibility: "hidden" }}>
									<div className="tj-nav-post__nav next_post">
										<Link href="#">
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

export default SupportTillCompletionDetails;