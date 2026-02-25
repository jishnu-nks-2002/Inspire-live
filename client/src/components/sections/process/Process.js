"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ProcessCard from "@/components/shared/cards/ProcessCard";

const Process = () => {
	const process = [
		{
			id: 1,
			title: "Consultation & Academic Assessment",
			desc: "We begin by understanding your academic background, research interests, and career goals. Our experts evaluate eligibility, discuss suitable universities or countries, and outline the best pathway for your PhD or study abroad journey.",
		},
		{
			id: 2,
			title: "Application & Research Execution",
			desc: "Once the plan is finalized, we assist with university shortlisting, supervisor identification, research proposal preparation, and complete application support. Every step is handled with accuracy, compliance, and academic best practices.",
		},
		{
			id: 3,
			title: " Admission Support & Continuous Guidance",
			desc: "After application submission, we provide ongoing support with interviews, offer letters, documentation, and next steps. Our guidance continues even after admission, ensuring a smooth transition and long-term academic success.",
		},
	];
	return (
		<section className="tj-working-process section-gap section-gap-x">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading-wrap">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								Our Process
							</span>
							<div className="heading-wrap-content">
								<div className="sec-heading style-2">
									<h2 className="sec-title text-anim">
										Seamless Process,  <span style={{ color: "white" }}>Successful Academic Outcomes.</span>
									</h2>
								</div>
								<p className="desc wow fadeInUp" data-wow-delay=".5s">
									Developing personalized customer journeys to increase
									satisfaction and loyalty.
								</p>
								<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
									<ButtonPrimary text={"Request a Call"} url={"/contact"} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="working-process-area">
							{process?.length
								? process?.map((processSingle, idx) => (
										<ProcessCard
											key={idx}
											processSingle={processSingle}
											idx={idx}
										/>
								  ))
								: ""}
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

export default Process;
