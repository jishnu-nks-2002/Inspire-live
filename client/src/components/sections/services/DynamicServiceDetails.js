"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getImageSrc(src) {
  if (!src) return "/images/service/service-1.webp";
  if (src.startsWith("http") || src.startsWith("/images")) return src;
  return API_BASE.replace("/api", "") + src;
}

const DynamicServiceDetails = function ({ service }) {
  if (!service) {
    return (
      <div className="container section-gap">
        <p>Service not found.</p>
      </div>
    );
  }

  var title = service.title;
  var subtitle = service.subtitle;
  var heroImage = service.heroImage;
  var detailImage1 = service.detailImage1;
  var detailImage2 = service.detailImage2;
  var description1 = service.description1;
  var description2 = service.description2;
  var keyFeatures = service.keyFeatures || [];
  var whyChooseHeading = service.whyChooseHeading;
  var whyChooseText = service.whyChooseText;
  var benefits = service.benefits || [];
  var faqs = service.faqs || [];
  var prevService = service.prevService;
  var nextService = service.nextService;

  return (
    <section className="tj-service-area section-gap">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="post-details-wrapper">

              <div className="blog-images wow fadeInUp" data-wow-delay=".1s">
                <Image
                  src={getImageSrc(heroImage)}
                  alt={title}
                  width={1170}
                  height={500}
                  style={{ height: "auto", width: "100%" }}
                />
              </div>

              <h2 className="title title-anim">
                {subtitle || title}
              </h2>

              <div className="blog-text">

                {description1 && (
                  <p className="wow fadeInUp" data-wow-delay=".3s">
                    {description1}
                  </p>
                )}

                {description2 && (
                  <p className="wow fadeInUp" data-wow-delay=".3s">
                    {description2}
                  </p>
                )}

                {keyFeatures.length > 0 && (
                  <ul className="wow fadeInUp" data-wow-delay=".3s">
                    {keyFeatures.map(function (feature, index) {
                      return (
                        <li key={index}>
                          <span>
                            <i className="tji-check"></i>
                          </span>
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {(detailImage1 || detailImage2) && (
                  <div className="images-wrap">
                    <div className="row">
                      {detailImage1 && (
                        <div className="col-sm-6">
                          <div
                            className="image-box wow fadeInUp"
                            data-wow-delay=".3s"
                          >
                            <Image
                              src={getImageSrc(detailImage1)}
                              alt={title + " - Detail 1"}
                              width={570}
                              height={400}
                              style={{ height: "auto", width: "100%" }}
                            />
                          </div>
                        </div>
                      )}
                      {detailImage2 && (
                        <div className="col-sm-6">
                          <div
                            className="image-box wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <Image
                              src={getImageSrc(detailImage2)}
                              alt={title + " - Detail 2"}
                              width={570}
                              height={400}
                              style={{ height: "auto", width: "100%" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {whyChooseHeading && (
                  <h3 className="wow fadeInUp" data-wow-delay=".3s">
                    {whyChooseHeading}
                  </h3>
                )}

                {whyChooseText && (
                  <p className="wow fadeInUp" data-wow-delay=".3s">
                    {whyChooseText}
                  </p>
                )}

                {benefits.length > 0 && (
                  <div className="details-content-box">
                    {benefits.map(function (benefit, index) {
                      return (
                        <div
                          key={index}
                          className="service-details-item wow fadeInUp"
                          data-wow-delay={"." + (index + 1) * 2 + "s"}
                        >
                          <span className="number">{benefit.number}.</span>
                          <h6
                            className="title"
                            dangerouslySetInnerHTML={{ __html: benefit.title }}
                          />
                          <div className="desc">
                            <p>{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {faqs.length > 0 && (
                  <>
                    <h3 className="wow fadeInUp" data-wow-delay=".3s">
                      Frequently Asked Questions
                    </h3>
                    <BootstrapWrapper>
                      <div className="accordion tj-faq style-2" id="faqOne">
                        {faqs.map(function (faq, index) {
                          return (
                            <div
                              key={index}
                              className={
                                "accordion-item " +
                                (index === 0 ? "active" : "") +
                                " wow fadeInUp"
                              }
                              data-wow-delay=".3s"
                            >
                              <button
                                className={
                                  "faq-title " +
                                  (index !== 0 ? "collapsed" : "")
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={"#faq-" + (index + 1)}
                                aria-expanded={index === 0 ? "true" : "false"}
                              >
                                {faq.question}
                              </button>
                              <div
                                id={"faq-" + (index + 1)}
                                className={
                                  "collapse " + (index === 0 ? "show" : "")
                                }
                                data-bs-parent="#faqOne"
                              >
                                <div className="accordion-body faq-text">
                                  <p>{faq.answer}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </BootstrapWrapper>
                  </>
                )}

              </div>

              <div
                className="tj-post__navigation mb-0 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div
                  className="tj-nav__post previous"
                  style={{ visibility: prevService ? "visible" : "hidden" }}
                >
                  <div className="tj-nav-post__nav prev_post">
                    <Link href={prevService ? "/services/" + prevService : "#"}>
                      <span>
                        <i className="tji-arrow-left"></i>
                      </span>
                      Previous
                    </Link>
                  </div>
                </div>

                <Link href="/services" className="tj-nav-post__grid">
                  <i className="tji-window"></i>
                </Link>

                <div
                  className="tj-nav__post next"
                  style={{ visibility: nextService ? "visible" : "hidden" }}
                >
                  <div className="tj-nav-post__nav next_post">
                    <Link href={nextService ? "/services/" + nextService : "#"}>
                      Next
                      <span>
                        <i className="tji-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicServiceDetails;