import Link from "next/link";
import Image from "next/image";

const ServiceCard3 = ({ service, idx, lastItem }) => {
	const {
		title,
		desc,
		slug,
		id,
		totalProject,
		img2 = "/images/service/service-2.webp",
		svg,
		iconName,
		iconImage,
	} = service || {};

	return (
		<div className="service-item style-3 wow fadeInUp" data-wow-delay=".3s">
			<div className="service-content-wrap">
				<div className="service-title">
					<div className="service-icon">
						{iconImage ? (
							<Image
								src={iconImage}
								alt={title}
								width={60}
								height={60}
								style={{ objectFit: "cover", borderRadius: "8px" }}
							/>
						) : (
							<i className={iconName ? iconName : "tji-service-1"}></i>
						)}
					</div>
					<h4 className="title">
						<Link href={`/services/${slug}`}>{title}</Link>
					</h4>
				</div>
				<div className="service-content">
					<p className="desc">{desc}</p>
				</div>
			</div>
			<div
				className="service-reveal-bg"
				style={{ backgroundImage: `url('${img2}')` }}
			></div>
		</div>
	);
};

export default ServiceCard3;