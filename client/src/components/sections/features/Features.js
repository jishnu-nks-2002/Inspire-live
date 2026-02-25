import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";

const Features = ({ type }) => {
	const features = [
		{
			title: "Consultation & Academic Assessment",
			desc: "We begin by understanding your academic background, research interests, and career goals. Our experts evaluate eligibility, discuss suitable universities or countries, and outline the best pathway for your PhD or study abroad journey.",
			icon: "tji-innovative",
		},
		{
			title: "Application & Research Execution",
			desc: "Once the plan is finalized, we assist with university shortlisting, supervisor identification, research proposal preparation, and complete application support. Every step is handled with accuracy, compliance, and academic best practices.",
			icon: "tji-award",
		},
		{
			title: "Admission Support & Continuous Guidance",
			desc: "After application submission, we provide ongoing support with interviews, offer letters, documentation, and next steps. Our guidance continues even after admission, ensuring a smooth transition and long-term academic success.",
			icon: "tji-support",
		},
	];

	return (
		<section id="choose" className="tj-choose-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{type == 2 ? (
							<div className="sec-heading-wrap">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>OUR PROCESS
								</span>
								<div className="heading-wrap-content">
									<div className="sec-heading">
										<h2 className="sec-title title-anim">
											Seamless Process,<span> Successful Academic Outcomes.</span>
										</h2>
									</div>
									<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
										<ButtonPrimary text="Request a Call" url="/contact" />
									</div>
								</div>
							</div>
						) : (
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>OUR PROCESS
								</span>
								<h2 className="sec-title title-anim">
										Seamless Process,<span> Successful Academic Outcomes.</span>
								</h2>
							</div>
						)}
					</div>
				</div>
				<div className="row row-gap-4 rightSwipeWrap">
					{features.map((feature, idx) => (
						<div key={idx} className="col-lg-4">
							<FeatureCard feature={feature} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Features;
