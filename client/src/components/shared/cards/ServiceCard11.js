import modifyNumber from "@/libs/modifyNumber";
import Link from "next/link";
import Image from "next/image";

const ServiceCard11 = ({ service, idx, lastItemIdx, biggerCard = false }) => {
	const {
		title,
		desc,
		desc3,
		slug,
		id,
		totalProject,
		img4 = "/images/service/h6-service-1.webp",
		svg,
		iconName,
		iconImage,
	} = service || {};

	return (
		<div className={`service-item style-4 ${biggerCard ? 'service-item-bigger' : ''}`}>
			<h6 className="h10-service-sln">{modifyNumber(idx + 1)}.</h6>
			<div className="service-icon">
				{iconImage ? (
					<Image 
						src={iconImage} 
						alt={title} 
						width={60} 
						height={60}
						className="service-icon-image"
					/>
				) : (
					<i className={iconName}></i>
				)}
			</div>
			<div className="service-content">
				<h4 className="title">
					<Link href={`/services/${slug}`}>{title}</Link>
				</h4>
				<p className="desc">
					{desc || desc3 || "Through a combination of data-driven insights and innovative approaches business."}
				</p>
				<Link className="text-btn" href={`/services/${slug}`}>
					<span className="btn-text">
						<span>Learn More</span>
					</span>
					<span className="btn-icon">
						<i className="tji-arrow-right-long"></i>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default ServiceCard11;