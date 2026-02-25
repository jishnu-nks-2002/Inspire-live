"use client";
import { useState, useEffect } from "react";
import BlogDetailsPrimary from "@/components/sections/blogs/BlogDetailsPrimary";
import HeroInner from "@/components/sections/hero/HeroInner";
import { fetchBlogById, fetchBlogs } from "@/utils/blogApi";

const BlogDetailsMain = ({ currentItemId }) => {
	const [blog, setBlog] = useState(null);
	const [allBlogs, setAllBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadBlogData = async () => {
			try {
				setLoading(true);
				// Fetch current blog
				const blogData = await fetchBlogById(currentItemId);
				setBlog(blogData.data || blogData);

				// Fetch all blogs for navigation
				const blogsData = await fetchBlogs();
				setAllBlogs(blogsData.data || blogsData.blogs || blogsData);
				
				setError(null);
			} catch (err) {
				setError(err.message);
				console.error('Error loading blog:', err);
			} finally {
				setLoading(false);
			}
		};

		if (currentItemId) {
			loadBlogData();
		}
	}, [currentItemId]);

	// Get previous and next blog IDs
	const getPreviousNextItem = () => {
		if (!allBlogs.length || !blog) return {};

		const currentIndex = allBlogs.findIndex(b => 
			(b._id || b.id) === (blog._id || blog.id)
		);

		return {
			currentItem: blog,
			prevId: currentIndex > 0 ? (allBlogs[currentIndex - 1]._id || allBlogs[currentIndex - 1].id) : null,
			nextId: currentIndex < allBlogs.length - 1 ? (allBlogs[currentIndex + 1]._id || allBlogs[currentIndex + 1].id) : null,
			isPrevItem: currentIndex > 0,
			isNextItem: currentIndex < allBlogs.length - 1,
		};
	};

	if (loading) {
		return (
			<div>
				<HeroInner title={"Loading..."} text={"Blog Details"} />
				<section className="section-gap">
					<div className="container">
						<div className="text-center">
							<p>Loading blog details...</p>
						</div>
					</div>
				</section>
			</div>
		);
	}

	if (error || !blog) {
		return (
			<div>
				<HeroInner title={"Error"} text={"Blog Not Found"} />
				<section className="section-gap">
					<div className="container">
						<div className="text-center">
							<p className="text-danger">
								{error || "Blog not found"}
							</p>
						</div>
					</div>
				</section>
			</div>
		);
	}

	const option = getPreviousNextItem();

	return (
		<div>
			<HeroInner
				title={"Blog Details"}
				text={blog.title || "Blog Details"}
				breadcrums={[{ name: "Blogs", path: "/blogs" }]}
			/>
			<BlogDetailsPrimary option={option} blogData={blog} />
		</div>
	);
};

export default BlogDetailsMain;