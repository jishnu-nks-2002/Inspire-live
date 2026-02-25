import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import useActiveLink from "@/hooks/useActiveLink";
import getNavItems from "@/libs/getNavItems";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ headerType, isStickyHeader }) => {
	const makeActiveLink = useActiveLink();
	const navItems = getNavItems();
	const homeNav = makeActiveLink(navItems[0]);
	const ourStoryNav = makeActiveLink(navItems[1]);
	const serviceNav = makeActiveLink(navItems[2]);
	const careersNav = makeActiveLink(navItems[3]);
	const blogNav = makeActiveLink(navItems[4]);
	const contactNav = makeActiveLink(navItems[5]);

	return (
		<div className="menu-area d-none d-lg-inline-flex align-items-center">
			<nav id="mobile-menu" className="mainmenu">
				<ul>
					<li className={homeNav?.isActive ? "current-menu-ancestor" : ""}>
						<Link href={homeNav?.path ? homeNav?.path : "/"}>
							{homeNav?.name}
						</Link>
					</li>
					<li
						className={`has-dropdown ${
							ourStoryNav?.isActive ? "current-menu-ancestor" : ""
						}`}
					>
						<Link href={ourStoryNav?.path}>{ourStoryNav?.name}</Link>
						<ul className="sub-menu">
							{ourStoryNav?.submenu?.length
								? ourStoryNav.submenu.map((item, idx) => (
										<li
											key={idx}
											className={item?.isActive ? "current-menu-item" : ""}
										>
											<Link href={item?.path ? item?.path : "/"}>
												{item?.name}
												{item?.badge ? (
													<span
														className={`mega-menu-badge tj-zoom-in-out-anim ${
															item?.badge === "HOT"
																? "mega-menu-badge-hot"
																: ""
														}`}
													>
														{item?.badge}
													</span>
												) : (
													""
												)}
											</Link>
										</li>
								  ))
								: ""}
						</ul>
					</li>
					<li
						className={`has-dropdown ${
							serviceNav?.isActive ? "current-menu-ancestor" : ""
						}`}
					>
						<Link href={serviceNav?.path ? serviceNav?.path : "#"}>
							{serviceNav?.name}
						</Link>
						<ul className="sub-menu  mega-menu-service">
							{serviceNav?.submenu?.length
								? serviceNav?.submenu?.map((item, idx) => (
										<li key={idx}>
											<Link
												className="mega-menu-service-single"
												href={item?.path ? item?.path : "/"}
											>
												{item?.image && (
													<span className="mega-menu-service-icon">
														<Image
															src={item.image}
															alt={item.name}
															width={40}
															height={40}
															style={{ objectFit: "cover", borderRadius: "4px" }}
														/>
													</span>
												)}
												<span className="mega-menu-service-title">
													{item?.name
														? item?.name
														: "Business process optimization"}
												</span>
												<span className="mega-menu-service-nav">
													<i className="tji-arrow-right-long"></i>
													<i className="tji-arrow-right-long"></i>
												</span>
											</Link>
										</li>
								  ))
								: ""}
						</ul>
					</li>
					<li className={careersNav?.isActive ? "current-menu-ancestor" : ""}>
						<Link href={careersNav?.path ? careersNav?.path : "#"}>
							{careersNav?.name ? careersNav?.name : "Careers"}
						</Link>
					</li>
					<li className={blogNav?.isActive ? "current-menu-ancestor" : ""}>
  <Link href={blogNav?.path ? blogNav?.path : "/blogs"}>
    {blogNav?.name ? blogNav?.name : "Blog"}
  </Link>
</li>
					<li className={contactNav?.isActive ? "current-menu-ancestor" : ""}>
						<Link href={contactNav?.path ? contactNav?.path : "#"}>
							{contactNav?.name ? contactNav?.name : "Contact"}
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;