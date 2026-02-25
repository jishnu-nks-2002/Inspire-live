import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import HeroInner from "@/components/sections/hero/HeroInner";
import SupportTillCompletionDetails from "@/components/sections/services/Supporttillcompletiondetails";

export const metadata = {
	title: "Support Till Completion - Complete PhD Journey Support",
	description: "End-to-end support throughout your PhD journey until successful completion.",
};

export default function SupportTillCompletionPage() {
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
							title="Support Till Completion"
							text="Support Till Completion"
							breadcrums={[{ name: "Services", path: "/services" }]}
						/>
						<SupportTillCompletionDetails />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}