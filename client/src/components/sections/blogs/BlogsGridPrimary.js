"use client";
import { useState, useEffect } from "react";
import BlogCard1 from "@/components/shared/cards/BlogCard1";
import Paginations from "@/components/shared/others/Paginations";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import usePagination from "@/hooks/usePagination";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const BlogsGridPrimary = ({ isSidebar = false, filters = {} }) => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const limit = 6;

	// Fetch blogs from backend API
	useEffect(() => {
		const loadBlogs = async () => {
			try {
				setLoading(true);
				setError(null);

				// Build query string from filters
				const queryParams = new URLSearchParams();
				if (filters.category) queryParams.append('category', filters.category);
				if (filters.tag) queryParams.append('tag', filters.tag);
				if (filters.author) queryParams.append('author', filters.author);
				if (filters.search) queryParams.append('search', filters.search);

				const queryString = queryParams.toString();
				const url = `${API_URL}/api/blogs${queryString ? `?${queryString}` : ''}`;

				console.log('Fetching blogs from:', url);

				const response = await fetch(url, {
					cache: 'no-store',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error(`Failed to fetch blogs: ${response.status}`);
				}

				const data = await response.json();
				console.log('Blogs fetched:', data);

				// Handle different response structures from your backend
				const blogsData = data.data || data.blogs || data || [];
				setBlogs(Array.isArray(blogsData) ? blogsData : []);
			} catch (err) {
				console.error('Error loading blogs:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadBlogs();
	}, [JSON.stringify(filters)]);

	// Get pagination details
	const {
		currentItems,
		currentpage,
		setCurrentpage,
		paginationItems,
		currentPaginationItems,
		totalPages,
		handleCurrentPage,
		firstItem,
		lastItem,
	} = usePagination(blogs, limit);

	const totalItems = blogs?.length;

	useEffect(() => {
		setCurrentpage(0);
	}, [totalItems, setCurrentpage]);

	// Loading state
	if (loading) {
		return (
			<section className="tj-blog-section section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 text-center">
							<div className="spinner-border text-primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<p className="mt-3">Loading blogs...</p>
						</div>
					</div>
				</div>
			</section>
		);
	}

	// Error state
	if (error) {
		return (
			<section className="tj-blog-section section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 text-center">
							<div className="alert alert-danger" role="alert">
								<h4 className="alert-heading">Error Loading Blogs</h4>
								<p>{error}</p>
								<hr />
								<p className="mb-0">Please try again later or contact support.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="tj-blog-section section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className={isSidebar ? "col-lg-8" : "col-lg-12"}>
						{currentItems?.length > 0 ? (
							<>
								<div className="row row-gap-4">
									{currentItems.map((blog, idx) => (
										<div
											key={blog._id || blog.id || idx}
											className={`col-md-6 ${isSidebar ? "" : "col-xl-4"}`}
										>
											<BlogCard1 blog={blog} idx={idx} />
										</div>
									))}
								</div>
								
								{/* Only show pagination if there are multiple pages */}
								{totalPages > 1 && (
									<Paginations
										paginationDetails={{
											currentItems,
											currentpage,
											setCurrentpage,
											paginationItems,
											currentPaginationItems,
											totalPages,
											handleCurrentPage,
											firstItem,
											lastItem,
										}}
										type={isSidebar ? 2 : 1}
									/>
								)}
							</>
						) : (
							<div className="text-center py-5">
								<i className="tji-document" style={{ fontSize: '4rem', color: '#ccc' }}></i>
								<h4 className="mt-3">No Blogs Found</h4>
								<p className="text-muted">
									{filters.search || filters.category || filters.tag 
										? 'Try adjusting your filters or search terms.' 
										: 'No blog posts are available at this time.'}
								</p>
							</div>
						)}
					</div>
					{isSidebar && (
						<div className="col-lg-4">
							<BlogSidebar type={2} />
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default BlogsGridPrimary;