import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import HeroInner from "@/components/sections/hero/HeroInner";
import GuideAllotmentDetails from "@/components/sections/services/Guideallotmentdetails";

export const metadata = {
	title: "Guide Allotment Support - Find Your Perfect PhD Supervisor",
	description: "Expert assistance in finding and connecting with the right PhD guide.",
};

export default function GuideAllotmentSupport() {
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
							title="Guide Allotment Support"
							text="Guide Allotment Support"
							breadcrums={[{ name: "Services", path: "/services" }]}
						/>
						<GuideAllotmentDetails />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}