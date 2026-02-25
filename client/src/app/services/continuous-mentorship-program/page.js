import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import HeroInner from "@/components/sections/hero/HeroInner";
import ContinuousMentorshipDetails from "@/components/sections/services/Continuousmentorshipdetails";

export const metadata = {
	title: "Continuous Mentorship Program - Your PhD Journey Partner",
	description: "Personalized ongoing mentorship from admission to graduation. Expert guidance for research, publications, and career development.",
};

export default function ContinuousMentorshipProgram() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner
							title="Continuous Mentorship Program"
							text="Continuous Mentorship Program"
							breadcrums={[{ name: "Services", path: "/services" }]}
						/>
						<ContinuousMentorshipDetails />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}