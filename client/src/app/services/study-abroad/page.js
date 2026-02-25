import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import HeroInner from "@/components/sections/hero/HeroInner";
import StudyAbroadDetails from "@/components/sections/services/Studyabroaddetails";

export const metadata = {
	title: "Study Abroad - Your Gateway to International Education",
	description: "Comprehensive study abroad services covering university selection, application process, visa guidance, and pre-departure preparation.",
};

export default function StudyAbroadPage() {
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
							title="Study Abroad"
							text="Study Abroad"
							breadcrums={[{ name: "Services", path: "/services" }]}
						/>
						<StudyAbroadDetails />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}