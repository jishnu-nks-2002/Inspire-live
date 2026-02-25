import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import HeroInner from "@/components/sections/hero/HeroInner";
import PhdEnrolmentDetails from "@/components/sections/services/Phdenrolmentdetails";

export const metadata = {
	title: "PhD Enrolment Support - Navigate PhD Admission Process",
	description: "Comprehensive assistance through every step of PhD admission and enrollment.",
};

export default function PhdEnrolmentSupport() {
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
							title="PhD Enrolment Support"
							text="PhD Enrolment Support"
							breadcrums={[{ name: "Services", path: "/services" }]}
						/>
						<PhdEnrolmentDetails />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}