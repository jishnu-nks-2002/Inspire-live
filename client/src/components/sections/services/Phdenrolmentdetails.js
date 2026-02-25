"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const PhdEnrolmentDetails = () => {
	const faqData = [
		{
			question: "What documents are required for PhD enrollment?",
			answer: "Typical PhD enrollment requires transcripts from previous degrees, research proposal, entrance exam scores (if applicable), letters of recommendation, statement of purpose, proof of identity, category certificates (if applicable), and supervisor's consent letter. We help you compile and organize all required documents according to university specifications."
		},
		{
			question: "When should I start the enrollment process?",
			answer: "The enrollment process should ideally begin 3-4 months before the semester starts. This allows sufficient time for document preparation, application submission, entrance exam preparation (if required), interview scheduling, and handling any unexpected delays. We provide a detailed timeline customized to your target universities."
		},
		{
			question: "Do you help with entrance exam preparation?",
			answer: "Yes, we provide comprehensive support for PhD entrance exams including UGC-NET, GATE, university-specific tests, and interview preparation. Our resources include previous year papers, study materials, mock tests, and one-on-one coaching to help you perform your best and secure admission."
		},
		{
			question: "What if I miss the enrollment deadline?",
			answer: "We help you identify universities with rolling admissions or multiple intake periods. If you miss a deadline, we guide you on alternative options, help you prepare stronger applications for the next cycle, and ensure you utilize the waiting period productively through research preparation and skill development."
		},
		{
			question: "Can you help with fellowships and fee waivers?",
			answer: "Absolutely. We assist in identifying and applying for various fellowships (UGC-JRF, CSIR, ICMR, DBT), institutional scholarships, and fee waivers. We help you understand eligibility criteria, prepare strong applications, and maximize your chances of securing financial support for your PhD."
		},
		{
			question: "Do you provide support for foreign students enrolling in India?",
			answer: "Yes, we offer specialized support for international students including visa guidance, document attestation, university liaison, accommodation assistance, and orientation to Indian academic systems. We ensure a smooth transition and successful enrollment for students from abroad."
		}
	];

	const keyFeatures = [
		"Document Preparation & Verification",
		"Application Form Assistance",
		"Entrance Exam Preparation",
		"Interview Coaching",
		"Fellowship Application Support",
		"Admission Follow-up",
		"Enrollment Formalities Guidance"
	];

	const benefits = [
		{
			number: "01",
			title: "Seamless Application<br/>Process",
			description: "We streamline the entire enrollment process from document collection to final admission. Our systematic approach ensures no deadlines are missed, all requirements are met, and your application is submitted with maximum impact."
		},
		{
			number: "02",
			title: "Entrance Exam<br/>Excellence",
			description: "Prepare effectively for university entrance tests and interviews with our expert coaching, practice materials, and proven strategies. We help you showcase your research potential and secure admission in your preferred program."
		},
		{
			number: "03",
			title: "Fellowship &<br/>Financial Support",
			description: "Navigate the complex landscape of PhD fellowships and scholarships with our expert guidance. We help you identify suitable funding opportunities, prepare competitive applications, and secure financial support for your doctoral studies."
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
									alt="PhD Enrolment Support"
									width={1170}
									height={500}
									style={{ height: "auto", width: "100%" }}
								/>
							</div>

							<h2 className="title title-anim">
								Navigate PhD admission and enrollment process with expert guidance
							</h2>

							<div className="blog-text">
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Our PhD Enrolment Support service provides comprehensive assistance through every step of the admission and enrollment process. From initial application to final registration, we ensure you navigate the complex procedures smoothly and meet all requirements efficiently.
								</p>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									With expertise in both Indian and international PhD admission processes, we help you prepare strong applications, ace entrance exams and interviews, secure fellowships, and complete enrollment formalities without stress. Our systematic approach has helped thousands of students successfully enroll in their dream PhD programs.
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
													alt="PhD Enrolment - Detail 1"
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
													alt="PhD Enrolment - Detail 2"
													width={570}
													height={400}
													style={{ height: "auto", width: "100%" }}
												/>
											</div>
										</div>
									</div>
								</div>

								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Why Choose Our Enrolment Support?
								</h3>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									PhD enrollment can be overwhelming with multiple requirements, strict deadlines, and complex procedures. Our expert support simplifies this journey, ensuring you don't miss critical steps or opportunities. With a 97% success rate in admission and fellowship applications, we've helped 2000+ students successfully enroll in prestigious PhD programs. Our detailed guidance covers everything from application strategy to final registration, giving you confidence throughout the process.
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
										<Link href="/services/guide-allotment-support">
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
										<Link href="/services/support-till-completion">
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

export default PhdEnrolmentDetails;