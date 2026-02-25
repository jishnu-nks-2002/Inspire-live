import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
const About3 = ({ type }) => {
	return (
		<section className="tj-about-section-2 section-gap section-gap-x">
			<div className="container">
				<div className="row">
					<div className="col-xl-6 col-lg-6 order-lg-1 order-2">
						<div
							className="about-img-area style-2 wow fadeInLeft"
							data-wow-delay=".3s"
						>
							<div className="about-img overflow-hidden">
								<Image
									data-speed=".8"
									src="/new-imges/about-images/img-1.png"
									alt=""
									width={591}
									height={639}
								/>
							</div>
							{/* <div className={`box-area ${type === 2 ? "style-2" : ""}`}>
								<div className="progress-box wow fadeInUp" data-wow-delay=".3s">
									<h4 className="title">Business Progress</h4>
									<ul className="tj-progress-list">
										<li>
											<h6 className="tj-progress-title">Revenue</h6>
											<div className="tj-progress">
												<span className="tj-progress-percent">82%</span>
												<div
													className="tj-progress-bar"
													data-percent="82"
												></div>
											</div>
										</li>
										<li>
											<h6 className="tj-progress-title">Satisfaction</h6>
											<div className="tj-progress">
												<span className="tj-progress-percent">90%</span>
												<div
													className="tj-progress-bar"
													data-percent="90"
												></div>
											</div>
										</li>
									</ul>
								</div>
							</div> */}
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 order-lg-2 order-1">
						<div className="about-content-area">
							<div className={`sec-heading ${type === 2 ? "" : "style-3"}`}>
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Get to Know Us
								</span>
								<h2 className="sec-title title-anim">
									{type === 2 ? (
										<>
											Our Commitment to Students & <span>Research Success.</span>
										</>
									) : (
										"Our Commitment to Students & Research Success"
									)}
								</h2>
							</div>
						</div>
						<div className="about-bottom-area">
							<div
								className="mission-vision-box wow fadeInLeft"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Mission</h4>
								<p className="desc">
									Our mission is to empower students and researchers by providing transparent, reliable, and expert academic guidance for PhD programs and international education. We aim to simplify complex admission processes, deliver personalized mentorship, and support scholars at every stage of their academic journey with integrity and excellence.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>Academic Excellence & Research Support
									</li>
									<li>
										<i className="tji-list"></i>Personalized Student Guidance
									</li>
									<li>
										<i className="tji-list"></i>Ethical & Transparent Consulting
									</li>
								</ul>
							</div>
							<div
								className="mission-vision-box wow fadeInRight"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Vision</h4>
								<p className="desc">
									Our vision is to become a globally recognized education consultancy, helping students achieve world-class academic opportunities and research success. We strive to build a trusted academic ecosystem that connects scholars with leading universities, research supervisors, and global education opportunities.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>Global Education Leadership

									</li>
									<li>
										<i className="tji-list"></i>Research & Innovation Support
									</li>
									<li>
										<i className="tji-list"></i>Sustainable Academic Success
									</li>
								</ul>
							</div>
						</div>
						<div className="about-btn-area wow fadeInUp" data-wow-delay=".5s">
							<ButtonPrimary text={"Learn More About Us"} url={"/about"} />
						</div>
					</div>
				</div>
			</div>
			{/* <div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div> */}
		</section>
	);
};

export default About3;
