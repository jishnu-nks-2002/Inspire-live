"use client";
import { useState } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import PopupVideo from "@/components/shared/popup-video/PopupVideo";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import makePath from "@/libs/makePath";
import Image from "next/image";
import Link from "next/link";

const BlogDetailsPrimary = ({ option, blogData }) => {
	const { prevId, nextId, isPrevItem, isNextItem } = option || {};
	const blog = blogData;
	
	// Extract blog data matching backend schema
	const { 
		title, 
		_id, 
		id, 
		detailsImg, 
		img, 
		tags, 
		author,
		authorImg,
		createdAt, 
		comments = [], 
		body,        // Main content field in your schema
		desc,        // Short description
		desc1,
		desc2,
		img1,
		img2,
		videoImg,
		videoUrl,
		popupVideo,
		category 
	} = blog || {};

	const blogId = _id || id;
	
	// Helper function to get proper image URL
	const getImageUrl = (imagePath) => {
		if (!imagePath) return null;
		if (imagePath.startsWith('http')) return imagePath;
		if (imagePath.startsWith('/uploads/')) return imagePath;
		if (imagePath.startsWith('uploads/')) return `/${imagePath}`;
		return imagePath;
	};

	// Comment form state - using backend schema fields
	const [commentForm, setCommentForm] = useState({
		authorName: '',  // Backend uses authorName
		email: '',
		desc: ''         // Backend uses desc (not message)
	});
	const [submitting, setSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState(null);

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setSubmitMessage(null);

		try {
			const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
			const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					authorName: commentForm.authorName,
					email: commentForm.email,
					desc: commentForm.desc,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to submit comment');
			}

			const result = await response.json();
			
			setSubmitMessage({ 
				type: 'success', 
				text: result.message || 'Comment submitted successfully! It will appear after approval.' 
			});
			setCommentForm({ authorName: '', email: '', desc: '' });
		} catch (error) {
			console.error('Comment submission error:', error);
			setSubmitMessage({ 
				type: 'error', 
				text: 'Failed to submit comment. Please try again.' 
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleInputChange = (e) => {
		setCommentForm({
			...commentForm,
			[e.target.name]: e.target.value
		});
	};

	// Format date
	const formatDate = (date) => {
		if (!date) return 'N/A';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	// Get approved comments - backend uses isApproved
	const approvedComments = comments?.filter(c => c.isApproved) || [];

	// Main blog image
	const mainImage = getImageUrl(detailsImg || img) || "/images/blog/blog-1.webp";
	
	// Author info - in your schema, author is a string
	const authorName = author || 'Unknown Author';
	const authorAvatar = getImageUrl(authorImg) || "/images/testimonial/client-2.webp";

	// Video URL - check both fields
	const videoLink = videoUrl || popupVideo || "https://www.youtube.com/watch?v=MLpWrANjFbI";

	return (
		<section className="tj-blog-section section-gap slidebar-stickiy-container">
			<div className="container">
				<div className="row row-gap-5">
					<div className="col-lg-8">
						<div className="post-details-wrapper">
							{/* Main Blog Image */}
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src={mainImage}
									alt={title || "Blog Image"}
									width={870}
									height={450}
									style={{ height: "auto" }}
									onError={(e) => {
										e.target.src = "/images/blog/blog-1.webp";
									}}
								/>
							</div>

							<h2 className="title title-anim">{title}</h2>

							{/* Blog Meta Information */}
							<div className="blog-category-two wow fadeInUp" data-wow-delay=".3s">
								<div className="category-item">
									<div className="cate-images">
										<Image
											src={authorAvatar}
											alt={authorName}
											width={89}
											height={89}
											onError={(e) => {
												e.target.src = "/images/testimonial/client-2.webp";
											}}
										/>
									</div>
									<div className="cate-text">
										<span className="degination">Authored by</span>
										<h6 className="title">
											<span>{authorName}</span>
										</h6>
									</div>
								</div>
								<div className="category-item">
									<div className="cate-icons">
										<i className="tji-calendar"></i>
									</div>
									<div className="cate-text">
										<span className="degination">Date Released</span>
										<h6 className="text">{formatDate(createdAt)}</h6>
									</div>
								</div>
								<div className="category-item">
									<div className="cate-icons">
										<i className="tji-comment"></i>
									</div>
									<div className="cate-text">
										<span className="degination">Comments</span>
										<h6 className="text">{approvedComments.length} Comments</h6>
									</div>
								</div>
							</div>

							{/* Blog Content */}
							<div className="blog-text">
								{body ? (
									<div 
										className="blog-content-html"
										dangerouslySetInnerHTML={{ __html: body }} 
									/>
								) : desc ? (
									<div className="blog-description">
										<p className="wow fadeInUp" data-wow-delay=".3s">
											{desc}
										</p>
										{desc1 && (
											<p className="wow fadeInUp" data-wow-delay=".4s">
												{desc1}
											</p>
										)}
										{desc2 && (
											<p className="wow fadeInUp" data-wow-delay=".5s">
												{desc2}
											</p>
										)}
									</div>
								) : (
									<p className="wow fadeInUp" data-wow-delay=".3s">
										In today's competitive landscape, businesses must continuously
										adapt and innovate to thrive. Unlocking Business Potential
										means identifying untapped opportunities and leveraging
										innovative solutions to drive growth, enhance efficiency, and
										foster lasting success.
									</p>
								)}

								{/* Additional Images */}
								{(img1 || img2) && (
									<div className="images-wrap">
										<div className="row">
											{img1 && (
												<div className="col-sm-6">
													<div className="image-box wow fadeInUp" data-wow-delay=".3s">
														<Image
															src={getImageUrl(img1) || "/images/blog/blog-1.webp"}
															alt="Image 1"
															width={420}
															height={420}
															style={{ height: "auto" }}
															onError={(e) => {
																e.target.src = "/images/blog/blog-1.webp";
															}}
														/>
													</div>
												</div>
											)}
											{img2 && (
												<div className="col-sm-6">
													<div className="image-box wow fadeInUp" data-wow-delay=".5s">
														<Image
															src={getImageUrl(img2) || "/images/blog/blog-1.webp"}
															alt="Image 2"
															width={420}
															height={420}
															style={{ height: "auto" }}
															onError={(e) => {
																e.target.src = "/images/blog/blog-1.webp";
															}}
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								)}

								{/* Video Section */}
								{videoImg && (
									<div className="blog-video wow fadeInUp" data-wow-delay=".3s">
										<Image
											src={getImageUrl(videoImg) || "/images/blog/blog-1.webp"}
											alt="Video"
											width={870}
											height={498}
											style={{ height: "auto" }}
											onError={(e) => {
												e.target.src = "/images/blog/blog-1.webp";
											}}
										/>
										<PopupVideo>
											<Link
												className="video-btn video-popup glightbox"
												href={videoLink}
											>
												<span>
													<i className="tji-play"></i>
												</span>
											</Link>
										</PopupVideo>
									</div>
								)}
							</div>

							{/* Tags and Share */}
							<div className="tj-tags-post wow fadeInUp" data-wow-delay=".3s">
								<div className="tagcloud">
									<span>Tags:</span>
									{tags?.length > 0 ? (
										tags.map((tag, idx) => (
											<Link key={idx} href={`/blogs?tag=${makePath(tag)}`}>
												{tag}
											</Link>
										))
									) : (
										<span>No tags</span>
									)}
								</div>
								<div className="post-share">
									<ul>
										<li>Share:</li>
										<li>
											<Link href="https://www.facebook.com/" target="_blank">
												<i className="fa-brands fa-facebook-f"></i>
											</Link>
										</li>
										<li>
											<Link href="https://x.com/" target="_blank">
												<i className="fa-brands fa-x-twitter"></i>
											</Link>
										</li>
										<li>
											<Link href="https://www.instagram.com/" target="_blank">
												<i className="fa-brands fa-instagram"></i>
											</Link>
										</li>
										<li>
											<Link href="https://www.linkedin.com/" target="_blank">
												<i className="fa-brands fa-linkedin-in"></i>
											</Link>
										</li>
									</ul>
								</div>
							</div>

							{/* Navigation */}
							<div className="tj-post__navigation wow fadeInUp" data-wow-delay="0.3s">
								<div
									className="tj-nav__post previous"
									style={{ visibility: isPrevItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav prev_post">
										<Link href={isPrevItem ? `/blogs/${prevId}` : "#"}>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<Link href={"/blogs"} className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								<div
									className="tj-nav__post next"
									style={{ visibility: isNextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link href={isNextItem ? `/blogs/${nextId}` : "#"}>
											Next
											<span>
												<i className="tji-arrow-right"></i>
											</span>
										</Link>
									</div>
								</div>
							</div>

							{/* Comments Section */}
							<div className="tj-comments-container">
								<div className="tj-comments-wrap">
									<div className="comments-title">
										<h3 className="title">
											Top Comments ({approvedComments.length})
										</h3>
									</div>
									{approvedComments.length > 0 ? (
										<div className="tj-latest-comments">
											<ul>
												{approvedComments.map((comment) => (
													<li key={comment._id || comment.id} className="tj-comment">
														<div className="comment-content">
															<div className="comment-avatar">
																<Image
																	src={getImageUrl(comment.img) || "/images/blog/avatar-1.webp"}
																	alt="Avatar"
																	width={64}
																	height={64}
																	style={{ height: "auto" }}
																	onError={(e) => {
																		e.target.src = "/images/blog/avatar-1.webp";
																	}}
																/>
															</div>
															<div className="comments-header">
																<div className="avatar-name">
																	<h6 className="title">
																		<Link href="#">{comment.authorName}</Link>
																	</h6>
																</div>
																<div className="comment-text">
																	<span className="date">
																		{formatDate(comment.date || comment.createdAt)}
																	</span>
																	<Link className="reply" href="#">
																		Reply
																	</Link>
																</div>
																<div className="desc">
																	<p>{comment.desc}</p>
																</div>
																
																{/* Render replies if they exist */}
																{comment.replies && comment.replies.length > 0 && (
																	<div className="comment-replies mt-3">
																		{comment.replies.map((reply) => (
																			<div key={reply._id} className="reply-item ms-4 mt-2">
																				<div className="d-flex gap-2">
																					<Image
																						src={getImageUrl(reply.img) || "/images/blog/avatar-1.webp"}
																						alt="Avatar"
																						width={40}
																						height={40}
																						style={{ height: "auto" }}
																						onError={(e) => {
																							e.target.src = "/images/blog/avatar-1.webp";
																						}}
																					/>
																					<div>
																						<h6 className="mb-1">{reply.authorName}</h6>
																						<p className="text-muted small mb-1">{formatDate(reply.date)}</p>
																						<p>{reply.desc}</p>
																					</div>
																				</div>
																			</div>
																		))}
																	</div>
																)}
															</div>
														</div>
													</li>
												))}
											</ul>
										</div>
									) : (
										<p>No approved comments yet. Be the first to comment!</p>
									)}
								</div>

								{/* Comment Form */}
								<div className="tj-comments__container">
									<div className="comment-respond">
										<h3 className="comment-reply-title">Leave a Comment</h3>
										{submitMessage && (
											<div className={`alert alert-${submitMessage.type === 'success' ? 'success' : 'danger'} mb-3`}>
												{submitMessage.text}
											</div>
										)}
										<form onSubmit={handleCommentSubmit}>
											<div className="row">
												<div className="col-lg-12">
													<div className="form-input">
														<textarea
															id="comment"
															name="desc"
															placeholder="Write Your Comment *"
															value={commentForm.desc}
															onChange={handleInputChange}
															required
															rows="6"
														></textarea>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-input">
														<input
															type="text"
															id="name"
															name="authorName"
															placeholder="Full Name *"
															value={commentForm.authorName}
															onChange={handleInputChange}
															required
														/>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-input">
														<input
															type="email"
															id="email"
															name="email"
															placeholder="Your Email *"
															value={commentForm.email}
															onChange={handleInputChange}
															required
														/>
													</div>
												</div>
												<div className="comments-btn">
													<ButtonPrimary 
														text={submitting ? "Submitting..." : "Submit Now"} 
														type={"submit"}
														disabled={submitting}
													/>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<BlogSidebar />
					</div>
				</div>
			</div>
		</section>
	);
};

export default BlogDetailsPrimary;