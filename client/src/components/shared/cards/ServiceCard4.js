import Link from "next/link";
import Image from "next/image";
import ButtonPrimary from "../buttons/ButtonPrimary";

const ServiceCard4 = ({ service }) => {
  const {
    title,
    desc,
    slug,
    iconName,
    iconImage,
  } = service || {};

  return (
    <div className="service-item style-4">
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
          <i className={iconName || "tji-service-1"}></i>
        )}
      </div>

      <div className="service-content">
        <h4 className="title">
          <Link href={`/services/${slug}`}>{title}</Link>
        </h4>

        <p className="desc">{desc}</p>

        <ButtonPrimary
          text="Learn More"
          url={`/services/${slug}`}
          isTextBtn={true}
        />
      </div>
    </div>
  );
};

export default ServiceCard4;
