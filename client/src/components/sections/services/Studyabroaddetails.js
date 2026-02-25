"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const StudyAbroadDetails = () => {
	const faqData = [
		{
			question: "Which countries are best for international students?",
			answer: "Popular study destinations include USA, UK, Canada, Australia, Germany, and New Zealand, each offering unique advantages. The best country depends on your field of study, budget, career goals, and personal preferences. We provide personalized counseling to help you choose the destination that aligns with your academic aspirations and financial capacity."
		},
		{
			question: "When should I start my study abroad application process?",
			answer: "Ideally, you should start 12-18 months before your intended start date. This timeline allows adequate time for exam preparation (IELTS/TOEFL, GRE/GMAT), university research, application submission, visa processing, and pre-departure arrangements. We create a personalized timeline for you, ensuring you meet all deadlines without rushing."
		},
		{
			question: "What are the language requirements for studying abroad?",
			answer: "Most English-speaking countries require IELTS or TOEFL scores. Minimum requirements vary by university and program, typically ranging from IELTS 6.0 to 7.5. Some countries like Germany and France may require proficiency in their native language. We guide you on language requirements and help you prepare for these tests effectively."
		},
		{
			question: "How much does it cost to study abroad?",
			answer: "Costs vary significantly by country and institution. Tuition can range from $10,000 to $50,000+ annually, plus living expenses of $10,000-$25,000 per year. We help you create a realistic budget, explore scholarship opportunities, and identify affordable yet quality institutions that match your financial situation."
		},
		{
			question: "Can I work while studying abroad?",
			answer: "Most countries allow international students to work part-time (typically 20 hours per week during term and full-time during breaks). This helps offset living expenses and gain valuable experience. We inform you about work regulations in your chosen destination and help you understand post-study work opportunities available."
		},
		{
			question: "What documents do I need for studying abroad?",
			answer: "Essential documents include academic transcripts, degree certificates, standardized test scores (IELTS/TOEFL, GRE/GMAT), letters of recommendation, statement of purpose, financial documents, and passport. Requirements vary by country and university. We provide a comprehensive checklist and assist you in preparing all necessary documentation correctly."
		}
	];

	const keyFeatures = [
		"Personalized Country Selection",
		"University Shortlisting",
		"Application Processing",
		"Visa Guidance & Support",
		"Scholarship Identification",
		"Test Preparation Assistance",
		"Pre-Departure Orientation"
	];

	const benefits = [
		{
			number: "01",
			title: "Personalized Education<br/>Counseling",
			description: "We take time to understand your academic background, career aspirations, and financial situation to recommend the best-fit universities and programs across multiple countries."
		},
		{
			number: "02",
			title: "End-to-End Application<br/>Management",
			description: "Our comprehensive service covers everything from standardized test preparation to visa assistance, ensuring a smooth journey from application to enrollment at your dream university."
		},
		{
			number: "03",
			title: "Scholarship & Financial<br/>Aid Support",
			description: "We help identify and apply for scholarships, grants, and financial aid opportunities that can significantly reduce your education costs and make studying abroad more affordable."
		}
	];

	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="post-details-wrapper">
							{/* Hero Image */}
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src="/images/service/service-5.webp"
									alt="Study Abroad"
									width={1170}
									height={500}
									style={{ height: "auto", width: "100%" }}
								/>
							</div>

							{/* Title */}
							<h2 className="title title-anim">
								Your gateway to international education opportunities worldwide
							</h2>

							{/* Main Content */}
							<div className="blog-text">
								<p className="wow fadeInUp" data-wow-delay=".3s">
									We simplify the complex process of studying abroad by providing personalized counseling and comprehensive support. From choosing the right country and university to securing your student visa, we're with you every step of the way.
								</p>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Our experienced consultants help you navigate scholarship opportunities, application deadlines, and documentation requirements. We ensure your application stands out and maximizes your chances of acceptance at top international institutions.
								</p>

								{/* Key Features List */}
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

								{/* Images Section */}
								<div className="images-wrap">
									<div className="row">
										<div className="col-sm-6">
											<div className="image-box wow fadeInUp" data-wow-delay=".3s">
												<Image
													src="/images/service/service-3.webp"
													alt="Study Abroad - Detail 1"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="image-box wow fadeInUp" data-wow-delay=".5s">
												<Image
													src="/images/service/service-1.webp"
													alt="Study Abroad - Detail 2"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Service Range Section */}
								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Why Choose Our Study Abroad Services?
								</h3>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Transform your academic dreams into reality with our end-to-end study abroad consultation services. We provide end-to-end support with a proven track record of success. Our personalized approach ensures that each student receives tailored guidance based on their unique background, goals, and circumstances. With 200+ Students Placed Globally, we have the expertise and connections to help you achieve your academic aspirations.
								</p>

								{/* Benefits/Details Content */}
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

								{/* FAQ Section */}
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

							{/* Navigation */}
							<div className="tj-post__navigation mb-0 wow fadeInUp" data-wow-delay="0.3s">
								<div className="tj-nav__post previous">
									<div className="tj-nav-post__nav prev_post">
										<Link href="/services/phd-india">
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
										<Link href="/services/phd-abroad">
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

export default StudyAbroadDetails;