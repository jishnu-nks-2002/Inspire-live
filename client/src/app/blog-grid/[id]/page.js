import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import BlogDetailsPrimary from "@/components/sections/blogs/BlogDetailsPrimary";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Fetch single blog from backend
async function fetchBlogById(id) {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${id}`, {
      cache: 'no-store', // Always get fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch blog ${id}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    // Handle different response structures
    return data.data || data.blog || data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Fetch all blogs from backend
async function fetchAllBlogs() {
  try {
    const response = await fetch(`${API_URL}/api/blogs`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch blogs: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Handle different response structures
    return data.data || data.blogs || data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// Generate static params for all blogs
export async function generateStaticParams() {
  try {
    const blogs = await fetchAllBlogs();
    
    return blogs.map((blog) => ({
      id: String(blog._id || blog.id),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const blog = await fetchBlogById(id);

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: blog.title || "Blog Details",
      description: blog.excerpt || blog.description || "Read our blog post",
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.description,
        images: blog.img ? [`${API_URL}${blog.img}`] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Blog Details",
    };
  }
}

// Main page component
export default async function BlogDetailsPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Validate ID
  if (!id || id === 'undefined' || id === 'null') {
    console.error('Invalid blog ID:', id);
    notFound();
  }

  try {
    console.log(`Fetching blog with ID: ${id}`);
    
    // Fetch current blog and all blogs in parallel
    const [blog, allBlogs] = await Promise.all([
      fetchBlogById(id),
      fetchAllBlogs(),
    ]);

    // Check if blog exists
    if (!blog) {
      console.error(`Blog not found: ${id}`);
      notFound();
    }

    console.log(`Blog fetched successfully: ${blog.title}`);

    // Calculate previous and next blog for navigation
    const currentIndex = allBlogs.findIndex(
      (b) => String(b._id || b.id) === String(blog._id || blog.id)
    );

    const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

    const option = {
      prevId: prevBlog ? String(prevBlog._id || prevBlog.id) : null,
      nextId: nextBlog ? String(nextBlog._id || nextBlog.id) : null,
      isPrevItem: !!prevBlog,
      isNextItem: !!nextBlog,
    };

    return (
      <div>
        <BackToTop />
        <Header />
        <Header isStickyHeader={true} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>
              <HeaderSpace />
              <HeroInner
                title={"Blog Details"}
                text={blog.title || "Blog Details"}
                breadcrums={[{ name: "Blogs", path: "/blogs" }]}
              />
              <BlogDetailsPrimary option={option} blogData={blog} />
              <Cta />
            </main>
            <Footer />
          </div>
        </div>
        <ClientWrapper />
      </div>
    );
  } catch (error) {
    console.error('Error loading blog page:', error);
    notFound();
  }
}