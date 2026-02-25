import getNavItems from "@/libs/getNavItems";
import Link from "next/link";
import Image from "next/image";
import MobileMenuItem from "./MobileMenuItem";

const MobileNavbar = () => {
	const navItems = getNavItems();
	const homeNav = navItems[0];
	const ourStoryNav = navItems[1];
	const serviceNav = navItems[2];
	const careersNav = navItems[3];
	const blogNav = navItems[4];
	const contactNav = navItems[5];

	return (
		<div className="hamburger_menu">
			<div className="mobile_menu mean-container">
				<div className="mean-bar">
					<Link
						href="#nav"
						className="meanmenu-reveal"
						style={{ right: 0, left: "auto" }}
					>
						<span>
							<span>
								<span></span>
							</span>
						</span>
					</Link>
					<nav className="mean-nav">
						<ul>
							<li className="mean-last">
								<Link href={homeNav?.path ? homeNav?.path : "/"}>
									{homeNav?.name}
								</Link>
							</li>
							<MobileMenuItem
								text={ourStoryNav?.name}
								url={ourStoryNav?.path}
							>
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
							</MobileMenuItem>
							<MobileMenuItem
								text={serviceNav?.name}
								url={serviceNav?.path ? serviceNav?.path : "#"}
								submenuClass={"mega-menu-service"}
							>
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
							</MobileMenuItem>
							<li className="mean-last">
								<Link href={careersNav?.path ? careersNav?.path : "#"}>
									{careersNav?.name ? careersNav?.name : "Careers"}
								</Link>
							</li>
							<MobileMenuItem
								text={blogNav?.name}
								url={blogNav?.path ? blogNav?.path : "#"}
							>
								{blogNav?.submenu?.length
									? blogNav?.submenu?.map((item, idx) => (
											<li
												key={idx}
												className={item?.isActive ? "current-menu-item" : ""}
											>
												<Link href={item?.path ? item?.path : "/blogs"}>
													{item?.name ? item?.name : "Blog"}
												</Link>
											</li>
									  ))
									: ""}
							</MobileMenuItem>
							<li className="mean-last">
								<Link href={contactNav?.path ? contactNav?.path : "#"}>
									{contactNav?.name ? contactNav?.name : "Contact"}
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MobileNavbar;