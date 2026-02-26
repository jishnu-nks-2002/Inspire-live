"use client";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getImageSrc(src) {
  if (!src) return "/images/service/service-1.webp";
  if (src.startsWith("http") || src.startsWith("/images")) return src;
  return API_BASE.replace("/api", "") + src;
}

const ServiceCard4 = function ({ service, idx }) {
  // Support both API shape (slug, title, heroImage) and legacy shape (id, title, img, iconName)
  var slug = service.slug || service.id;
  var title = service.title || service.titleLarge;
  var imageSrc = service.heroImage
    ? getImageSrc(service.heroImage)
    : service.img
    ? service.img
    : "/images/service/service-1.webp";
  var iconName = service.iconName || "tji-settings";

  var href = "/services/" + slug;

  return (
    <div className="tj-service-item-4">
      <div className="service-icon">
        <i className={iconName}></i>
      </div>
      <div className="service-content">
        <h5 className="service-title">
          <Link href={href}>{title}</Link>
        </h5>
        {service.description1 && (
          <p className="service-desc">
            {service.description1.length > 100
              ? service.description1.slice(0, 100) + "..."
              : service.description1}
          </p>
        )}
      </div>
      <div className="service-btn">
        <Link href={href} className="tj-btn-primary">
          Read More
          <span>
            <i className="tji-arrow-right"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard4;